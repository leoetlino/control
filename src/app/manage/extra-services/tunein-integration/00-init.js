angular.module('control.manage.extra-services').run(function (ManageService) {
    ManageService.addItem({
        sectionId: 'extra-services',
        name: 'TuneIn AIR Integration',
        icon: 'headphones',
        route: {
            subPathName: 'tunein-integration',
            name: 'tuneinIntegration',
            template: '/app/manage/extra-services/tunein-integration/tunein-integration.html',
            controller: 'TuneInIntegrationCtrl',
            title: 'TuneIn Integration',
            resolve: /*@ngInject*/ {
                settings: function (TuneInIntegrationService, $q) {
                    return TuneInIntegrationService.getSettings().then(function (settings) {
                        return $q.resolve(settings);
                    }, function () {
                        return $q.resolve({});
                    });
                },
            },
        },
    });
});
