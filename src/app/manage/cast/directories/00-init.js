angular.module('control.manage.cast').run(function (ManageService) {
    ManageService.addItem({
        sectionId: 'cast',
        name: 'Directories',
        icon: 'th-list',
        order: 4,
        route: {
            subPathName: 'directories',
            name: 'directories',
            template: '/app/manage/cast/directories/directories.html',
            controller: 'DirectoriesCtrl',
            controllerAs: 'ctrl',
            title: 'Directories',
            resolve: /*@ngInject*/ {
                config: function (ConfigService) {
                    return ConfigService.getConfig();
                },
                choices: function (DirectoriesService) {
                    return DirectoriesService.getChoices();
                }
            }
        }
    });
});
