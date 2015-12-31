angular.module('control.manage.cast').run(function (ManageService) {
    ManageService.addItem({
        sectionId: 'cast',
        name: 'GeoLock',
        iconHtml: `<span class="geolock-icon-container">
  <i class="fa fa-globe fa-fw"></i>
  <i class="fa fa-lock"></i>
</span>
`,
        order: 50,
        route: {
            subPathName: 'geolock',
            name: 'geolock',
            template: '/app/manage/cast/geolock/geolock.html',
            controller: 'GeoLockCtrl',
            controllerAs: 'ctrl',
            title: 'GeoLock',
            resolve: /*@ngInject*/ {
                config: (ConfigService) => ConfigService.getConfig(),
                countries: (ConfigService) => ConfigService.getCountries(),
            },
        },
    });
});
