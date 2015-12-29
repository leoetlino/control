import { angular } from '../vendor';
import DashboardCtrl from './dashboard-ctrl';
import DashboardService from './dashboard-service';

export default angular.module('control.dashboard', [])
    .service('DashboardService', DashboardService)
    .controller('DashboardCtrl', DashboardCtrl)
    .run(/*@ngInject*/ function ($routeSegmentProvider, USER_ROLES) {
        $routeSegmentProvider
            .when('/', 'dashboard')
            .segment('dashboard', {
                template: require('./dashboard.html'),
                authorizedRoles: [USER_ROLES.all],
                title: 'Dashboard',
                resolve: {
                    summary: ['DashboardService', (DashService) => DashService.getInfo()],
                },
                controller: 'DashboardCtrl',
            });
    })
    .name;
