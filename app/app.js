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
    'common/services/HttpTimeoutInterceptor',
    'login/services/Session',
    'login/services/AuthService',
    'login/services/AuthInterceptor',
    'common/controllers/NavigationCtrl',
    'login/controllers/LoginCtrl',
    'dashboard/services/DashService',
    'manage/services/ManageService',
    'feedback/services/FeedbackService'
], function() {
    angular.bootstrap(document, ['control']);
});
