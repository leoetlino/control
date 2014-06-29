/*
 * Loader
 * Copyright © 2014, Innovate Technologies.
 *
 */

require.config({
    baseUrl: "/app"
});

require([
    'control',
    'common/services/routeResolver',
    'login/services/Session',
    'login/services/AuthService',
    'login/services/AuthInterceptor',
    'common/controllers/NavigationCtrl',
    'login/controllers/LoginCtrl',
    'dashboard/services/DashService',
    'manage/services/ManageService'
], function() {
    angular.bootstrap(document, ['control']);
});