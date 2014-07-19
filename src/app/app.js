(function() {
    'use strict';
    /* global require, angular, document */
    require.config({
        baseUrl: '/app'
    });

    require([
        'control',
        'common/services/routeResolver',
        'common/services/HttpTimeoutInterceptor',
        'common/services/ServerErrorInterceptor',
        'login/services/Session',
        'login/services/AuthChecker',
        'login/services/AuthService',
        'login/services/AuthInterceptor',
        'common/controllers/NavigationCtrl',
        'login/controllers/LoginCtrl',
        'dashboard/controllers/DashboardCtrl',
        'dashboard/services/DashService',
        'manage/services/ManageService',
        'feedback/services/FeedbackService',
        'requestapp/services/RequestappService'
    ], function() {
        angular.bootstrap(document, ['control']);
    });
})();
