define([], function () {
    'use strict';

    var control = angular.module('control', [
        'config',
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'LocalStorageModule',
        'angular-loading-bar',
        'angular-flash.service',
        'angular-flash.flash-alert-directive',
        'ngFileUpload',
        'colorpicker.module',
        'ngBootbox',
        'toggle-switch',
        'ui.bootstrap',
        'ui.bootstrap.showErrors',
        'mgcrea.ngStrap',
        'picardy.fontawesome',
        'templates-main'
    ]);

    control.config(function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, USER_ROLES, flashProvider, $httpProvider) {

        flashProvider.errorClassnames.push('alert-danger');
        flashProvider.warnClassnames.push('alert-warning');
        flashProvider.infoClassnames.push('alert-info');
        flashProvider.successClassnames.push('alert-success');

        control.$httpProvider = $httpProvider;

        $routeProvider
        .when('/login', {
            authorizedRoles: [USER_ROLES.public],
            templateUrl: '/app/login/partials/login.html',
            controller: 'LoginCtrl',
            title: 'Log In'
        })
        .when('/', {
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
        .when('/manage', {
            templateUrl: '/app/manage/partials/manage.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Manage your servers',
            resolve: {
                service: function (ManageService) {
                    return ManageService.getSelectedService();
                }
            },
            controller: 'ManageCtrl'
        })
        .when('/stats', {
            templateUrl: '/app/stats/partials/stats.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Stats',
            controller: 'StatsCtrl'
        })
        .when('/feedback', {
            templateUrl: '/app/feedback/partials/feedback.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Send your feedback',
            controller: 'FeedbackCtrl'
        })
        .when('/manage/request-app', {
            templateUrl: '/app/manage/partials/request-app.html',
            authorizedRoles: [USER_ROLES.all],
            paidOnly: true,
            title: 'Request your mobile apps',
            controller: 'RequestAppCtrl',
            resolve: {
                service: function (ManageService) {
                    return ManageService.getSelectedService();
                }
            }
        })
        .when('/manage/now-playing-tweets', {
            templateUrl: '/app/manage/partials/now-playing-tweets.html',
            authorizedRoles: [USER_ROLES.all],
            paidOnly: true,
            title: '#NowPlaying Tweets',
            controller: 'NowPlayingTweetsCtrl',
            resolve: {
                service: function (ManageService) {
                    return ManageService.getSelectedService();
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.interceptors.push('HttpTimeoutInterceptor');
        $httpProvider.interceptors.push('ServerErrorInterceptor');
    });

    return control;
});
