/*
 * Copyright (C) 2014, Innovate Technologies.
 *
 * -------------------------------------
 * From our Co-Founder, Maarten Eyskens:
 *
 * You're about to see the most modern control panel for SHOUTcast/Icecast
 * When you look close to all the existing systems all you see is outdated software
 * The most modern system I have seen was not even accessible to me but
 * With Control there comes an end to AJAX to be the most recent thing in radio
 *
 * It's time to do what is in our name
 * Innovate
 *
 * Maarten Eyskens
 * Co-Founder Innovate Technologies
 */

/* global define, angular, $, require */
define(['common/services/routeResolver'], function () {
    'use strict';

    var control = angular.module('control', ['LocalStorageModule', 'angular-loading-bar', 'angular-flash.service', 'angular-flash.flash-alert-directive', 'routeResolverServices', 'ui.bootstrap', 'ngRoute', 'ngAnimate', 'angularFileUpload', 'colorpicker.module']);

    control.config(['$routeProvider', '$locationProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'USER_ROLES', 'flashProvider',
        function ($routeProvider, $locationProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, USER_ROLES, flashProvider) {

            flashProvider.errorClassnames.push('alert-danger');
            flashProvider.warnClassnames.push('alert-warning');
            flashProvider.infoClassnames.push('alert-info');
            flashProvider.successClassnames.push('alert-success');

            control.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
            var route = routeResolverProvider.route();

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
                        controller: ['$q', '$rootScope', function ($q, $rootScope) {
                            var defer = $q.defer();
                            require(['/app/dashboard/controllers/DashboardCtrl.js'], function () {
                                defer.resolve();
                                $rootScope.$apply();
                            });
                            return defer.promise;
                        }]
                    },
                    controller: 'DashboardCtrl'
                })
                .when('/manage', $.extend({}, route.resolve('manage', 'Manage your servers'), {
                    authorizedRoles: [USER_ROLES.all]
                }))
                .when('/stats', $.extend({}, route.resolve('stats', 'Stats'), {
                    authorizedRoles: [USER_ROLES.all]
                }))
                .when('/feedback', $.extend({}, route.resolve('feedback', 'Feedback'), {
                    authorizedRoles: [USER_ROLES.all]
                }))
                .when('/requestapp', $.extend({}, route.resolve('requestapp', 'Request your mobile app'), {
                    authorizedRoles: [USER_ROLES.all]
                }))
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
    }]);

    control.config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.interceptors.push('HttpTimeoutInterceptor');
    });

    return control;
});
