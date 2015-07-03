define([], function () {
    'use strict';

    var control = angular.module('control', [
        'config',
        'ngRoute',
        'route-segment',
        'view-segment',
        'ngAnimate',
        'ngSanitize',
        'LocalStorageModule',
        'angular-loading-bar',
        'angular-flash.service',
        'angular-flash.flash-alert-directive',
        'ngFileUpload',
        'colorpicker.module',
        'toggle-switch',
        'ui.bootstrap.showErrors',
        'mgcrea.ngStrap',
        'picardy.fontawesome',
        'templates-main'
    ]);

    control.config(function ($routeSegmentProvider, $routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, USER_ROLES, flashProvider, $httpProvider) {

        flashProvider.errorClassnames.push('alert-danger');
        flashProvider.warnClassnames.push('alert-warning');
        flashProvider.infoClassnames.push('alert-info');
        flashProvider.successClassnames.push('alert-success');

        control.$httpProvider = $httpProvider;

        var watchForService = function ($rootScope) {
            return $rootScope.service;
        };

        $routeSegmentProvider
        .when('/log-in', 'login')
        .when('/', 'dashboard')
        .when('/feedback', 'feedback')
        .when('/manage', 'manage')
        .when('/manage/information', 'manage.information')
        .when('/manage/request-app', 'manage.requestApp')
        .when('/manage/now-playing-tweets', 'manage.nowPlayingTweets')

        .segment('login', {
            authorizedRoles: [USER_ROLES.public],
            templateUrl: '/app/login/partials/login.html',
            controller: 'LoginCtrl',
            title: 'Log In'
        })
        .segment('dashboard', {
            templateUrl: '/app/dashboard/partials/dashboard.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Dashboard',
            resolve: {
                summary: function (DashService) {
                    return DashService.getInfo().then(function (response) {
                        return response.data;
                    });
                },
                services: function (ManageService) {
                    return ManageService.getServicesList().then(function (response) {
                        return response.data;
                    });
                }
            },
            controller: 'DashboardCtrl'
        })
        .segment('feedback', {
            templateUrl: '/app/feedback/partials/feedback.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Send your feedback',
            controller: 'FeedbackCtrl'
        })
        .segment('manage', {
            templateUrl: '/app/manage/partials/manage.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Manage your servers',
            resolve: {
                service: function (ManageService) {
                    return ManageService.initAndGetService();
                }
            },
            controller: 'ManageCtrl',
            watcher: watchForService
        })
            .within()
            .segment('information', {
                default: true,
                templateUrl: '/app/manage/partials/information.html',
                authorizedRoles: [USER_ROLES.all],
                title: 'Information',
                watcher: watchForService
            })
            .segment('requestApp', {
                templateUrl: '/app/manage/partials/request-app.html',
                authorizedRoles: [USER_ROLES.all],
                paidOnly: true,
                title: 'Request your mobile apps',
                controller: 'RequestAppCtrl',
                watcher: watchForService
            })
            .segment('nowPlayingTweets', {
                templateUrl: '/app/manage/partials/now-playing-tweets.html',
                authorizedRoles: [USER_ROLES.all],
                paidOnly: true,
                title: '#NowPlaying Tweets',
                controller: 'NowPlayingTweetsCtrl',
                watcher: watchForService
            })
        .up();

        $routeProvider.otherwise({
            redirectTo: '/'
        });
        $routeProvider.when('/login', {
            redirectTo: '/log-in'
        });
        $routeSegmentProvider.options.strictMode = true;

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.interceptors.push('HttpTimeoutInterceptor');
        $httpProvider.interceptors.push('ServerErrorInterceptor');
    });

    return control;
});
