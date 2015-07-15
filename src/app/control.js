/* global control:true */

control = null;

(function () {
    'use strict';

    angular.module('config', []).constant('ENV', { apiEndpoint:'itframe.shoutca.st' });

    control = angular.module('control', [
        'config',
        'templates',
        'control.feedback',
        'control.manage.extra-services',
        'angular-promise-cache',
        'ngRoute',
        'route-segment',
        'view-segment',
        'ngAnimate',
        'ngSanitize',
        'LocalStorageModule',
        'angular-loading-bar',
        'ngFileUpload',
        'colorpicker.module',
        'toggle-switch',
        'ui.bootstrap.showErrors',
        'mgcrea.ngStrap',
        'picardy.fontawesome'
    ]);

    control.config(function ($routeSegmentProvider, $routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, USER_ROLES, $httpProvider, $provide, $alertProvider) {

        angular.extend($alertProvider.defaults, {
            animation: 'am-fade-and-slide-top',
            placement: 'top'
        });

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
            if (!$rootScope.service) {
                return;
            }
            return $rootScope.service.id;
        }];

        $routeSegmentProvider
        .when('/log-in', 'login')
        .when('/', 'dashboard')
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

        $routeProvider.when('/login', { redirectTo: '/log-in' });
        $routeProvider.when('/manage/request-app', { redirectTo: '/manage/apps' });

        $routeSegmentProvider.options.strictMode = true;
        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.interceptors.push('HttpTimeoutInterceptor');
        $httpProvider.interceptors.push('ServerErrorInterceptor');
    });

}());
