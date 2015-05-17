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
        'manage/filters/appStatus',
        'manage/controllers/ManageCtrl',
        'manage/services/ManageService',
        'feedback/controllers/FeedbackCtrl',
        'feedback/services/FeedbackService',
        'manage/controllers/RequestAppCtrl',
        'manage/services/RequestAppService',
        'manage/controllers/NowPlayingTweetsCtrl',
        'manage/services/NowPlayingTweetsService',
        'stats/controllers/StatsCtrl'
    ], function () {
        angular.bootstrap(document, ['control']);
    });
}());
