(function () {
    'use strict';
    /* global require, angular, document */
    require.config({
        baseUrl: '/app'
    });

    require([
        'control',
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
        'manage/controllers/ManageCtrl',
        'manage/services/ManageService',
        'feedback/controllers/FeedbackCtrl',
        'feedback/services/FeedbackService',
        'request-app/controllers/RequestAppCtrl',
        'request-app/services/RequestAppService',
        'stats/controllers/StatsCtrl'
    ], function () {
        angular.bootstrap(document, ['control']);
    });
}());
