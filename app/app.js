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
    'login/controllers/LoginCtrl'
], function() {
    angular.bootstrap(document, ['control']);
});