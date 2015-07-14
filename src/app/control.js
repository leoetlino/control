/* global control:true */

control = null;

(function () {
    'use strict';

    angular.module('config', []).constant('ENV', { apiEndpoint:'itframe.shoutca.st' });

    control = angular.module('control', [
        'config',
        'templates',
        'control.manage.cast',
        'control.manage.extra-services',
        'angular-promise-cache',
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
        'picardy.fontawesome'
    ]);

    control.config(function ($routeSegmentProvider, $routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, USER_ROLES, flashProvider, $httpProvider, $provide) {

        flashProvider.errorClassnames.push('alert-danger');
        flashProvider.warnClassnames.push('alert-warning');
        flashProvider.infoClassnames.push('alert-info');
        flashProvider.successClassnames.push('alert-success');

        control.$httpProvider = $httpProvider;
        control.segments = $routeSegmentProvider.segments;
        $provide.factory('$routeSegmentProvider', function () {
            return $routeSegmentProvider;
        });

        // ------------------------------------------------------------
        //                       IMPORTANT
        // ------------------------------------------------------------
        // ng-annotate does NOT detect the DI in the routing
        // So you must use the array syntax and make it minify-friendly
        // ------------------------------------------------------------

        var watchForService = ['$rootScope', function ($rootScope) {
            return $rootScope.service.id;
        }];

        $routeSegmentProvider
        .when('/log-in', 'login')
        .when('/', 'dashboard')
        .when('/feedback', 'feedback')
        .when('/manage', 'manage')
        .when('/manage/information', 'manage.information')

        .segment('login', {
            authorizedRoles: [USER_ROLES.public],
            templateUrl: '/app/login/login.html',
            controller: 'LoginCtrl',
            title: 'Log In'
        })
        .segment('dashboard', {
            templateUrl: '/app/dashboard/dashboard.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Dashboard',
            resolve: {
                summary: ['DashService', function (DashService) {
                    return DashService.getInfo().then(function (response) {
                        return response.data;
                    });
                }],
                services: ['ServicesService', function (ServicesService) {
                    return ServicesService.initAndGetServices();
                }]
            },
            controller: 'DashboardCtrl'
        })
        .segment('feedback', {
            templateUrl: '/app/feedback/feedback.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Send your feedback',
            controller: 'FeedbackCtrl'
        })
        .segment('manage', {
            templateUrl: '/app/manage/manage.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Manage your servers',
            resolve: {
                service: ['ServicesService', function (ServicesService) {
                    return ServicesService.initAndGetService();
                }]
            },
            controller: 'ManageCtrl',
            watcher: watchForService
        })
            .within()
            .segment('information', {
                default: true,
                templateUrl: '/app/manage/information-pane.html',
                authorizedRoles: [USER_ROLES.all],
                title: 'Information',
                watcher: watchForService
            })
        .up()
        .otherwise('/');

        // ------------------------------------------------------------
        //                       IMPORTANT
        // ------------------------------------------------------------
        // ng-annotate does NOT detect the DI in the routing
        // So you must use the array syntax and make it minify-friendly
        // ------------------------------------------------------------

        $routeProvider.when('/login', {
            redirectTo: '/log-in'
        });
        $routeSegmentProvider.options.strictMode = true;

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.interceptors.push('HttpTimeoutInterceptor');
        $httpProvider.interceptors.push('ServerErrorInterceptor');
    });

}());
