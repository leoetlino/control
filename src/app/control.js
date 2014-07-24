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

/* global define, angular */
define([], function () {
    'use strict';

    var control = angular.module('control', ['LocalStorageModule', 'angular-loading-bar', 'angular-flash.service', 'angular-flash.flash-alert-directive', 'ui.bootstrap', 'ngRoute', 'ngAnimate', 'angularFileUpload', 'colorpicker.module', 'config', 'ngBootbox', 'picardy.fontawesome', 'templates-main', 'ui.bootstrap.showErrors']);

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
                        services: function (ManageService) {
                            return ManageService.getServicesList().then(function (response) {
                                return response.data;
                            });
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
                .when('/manage/:username/request-app', {
                    templateUrl: '/app/request-app/partials/request-app.html',
                    authorizedRoles: [USER_ROLES.all],
                    title: 'Request your mobile apps',
                    controller: 'RequestAppCtrl',
                    resolve: {
                        services: function (ManageService) {
                            return ManageService.getServicesList().then(function (response) {
                                return response.data;
                            });
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
