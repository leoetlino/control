angular.module('control.manage.cast').run(function (ManageService) {
    ManageService.addItem({
        sectionId: 'cast',
        name: 'Connection Info',
        icon: 'info',
        order: 2,
        route: {
            subPathName: 'connection-info',
            name: 'connectionInfo',
            template: '/app/manage/cast/connection-info/connection-info.html',
            controller: 'ConnectionInfoCtrl',
            controllerAs: 'ctrl',
            title: 'Connection Info',
            resolve: /*@ngInject*/ {
                config: function (ConfigService) {
                    return ConfigService.getConfig();
                },
            },
        },
    });
});
