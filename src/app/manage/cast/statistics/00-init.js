angular.module('control.manage.cast').run(function (ManageService) {
    ManageService.addItem({
        sectionId: 'cast',
        name: 'Statistics',
        icon: 'pie-chart',
        order: 5,
        route: {
            subPathName: 'statistics',
            name: 'statistics',
            template: '/app/manage/cast/statistics/statistics.html',
            controller: 'StatisticsCtrl',
            controllerAs: 'ctrl',
            title: 'Statistics',
            resolve: /*@ngInject*/ {
                config: function (ConfigService) {
                    return ConfigService.getConfig();
                },
            },
        },
    });
});
