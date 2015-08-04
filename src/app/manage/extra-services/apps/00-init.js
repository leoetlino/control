angular.module('control.manage.extra-services').run(function (ManageService) {
    ManageService.addItem({
        sectionId: 'extra-services',
        name: 'Mobile Apps',
        icon: 'mobile-phone',
        route: {
            subPathName: 'apps',
            name: 'requestApp',
            template: '/app/manage/extra-services/apps/request-app.html',
            controller: 'RequestAppCtrl',
        },
    });
});
