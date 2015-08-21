angular.module('control.manage.extra-services').run(function (
    ManageService,
    $routeSegmentProvider,
    USER_ROLES) {

    ManageService.addItem({
        sectionId: 'extra-services',
        name: 'Mobile Apps',
        icon: 'mobile-phone',
        route: {
            subPathName: 'apps',
            name: 'requestApp',
            template: '/app/manage/extra-services/apps/request-app.html',
            controller: 'RequestAppCtrl',
            resolve: /*@ngInject*/ {
                apps: function (RequestAppService) {
                    return RequestAppService.getAppsObject();
                },
            },
        },
    });

    $routeSegmentProvider
        .when('/manage/apps/view-request/:platform', 'manage.apps')
        .within('manage')
        .segment('apps', {
            templateUrl: '/app/manage/extra-services/apps/view-app-request.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'App Request',
            watcher: /*@ngInject*/ function ($rootScope) {
                if (!$rootScope.service) {
                    return;
                }
                return $rootScope.service.id;
            },
            controller: 'AppRequestCtrl',
            controllerAs: 'ctrl',
            dependencies: ['platform'],
            resolve: /*@ngInject*/ {
                app: function (RequestAppService, $route, $alert, $location, $q) {
                    var platform = $route.current.params.platform;
                    if (['android', 'iOS'].indexOf(platform) === -1) {
                        $alert({
                            content: 'The requested app platform does not exist.',
                            type: 'danger',
                            duration: 5,
                        });
                        $location.path('/manage/apps').replace();
                        return $q.reject();
                    }

                    return RequestAppService.getRequest(platform);
                },
            },
        });
});
