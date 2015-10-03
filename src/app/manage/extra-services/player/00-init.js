angular.module('control.manage.extra-services').run(function (ManageService) {
    ManageService.addItem({
        sectionId: 'extra-services',
        name: 'Player',
        icon: 'play',
        route: {
            subPathName: 'player',
            name: 'player',
            template: '/app/manage/extra-services/player/player.html',
            controller: 'PlayerCtrl',
            title: 'Player',
            resolve: /*@ngInject*/ {
                settings: function (PlayerService, $q) {
                    return PlayerService.getSettings().then(function (settings) {
                        return $q.resolve(settings);
                    }, function () {
                        return $q.resolve({});
                    });
                },
            },
        },
    });
});
