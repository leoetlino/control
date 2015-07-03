/* global define */
define(['control'], function(control) {
    control.controller('NavigationCtrl', function ($scope, $location, $rootScope, $route, USER_ROLES, AUTH_EVENTS, AuthChecker, AuthService, flash, Session, ManageService, $window) {

        ////////////////////
        // Helper functions
        ////////////////////

        $scope.isActive = function (viewLocation) {
            return (viewLocation === '/') ? viewLocation === $location.path() : $location.path().indexOf(viewLocation) > -1;
        };

        $rootScope.reloadServices = function () {
            return ManageService.refreshServices();
        };

        $rootScope.$on('routeSegmentChange', function (event, route) {
            $rootScope.pageTitle = route.segment.params.title;
        });

        ////////////
        // Services
        ////////////

        function initServices () {
            return ManageService.getServicesList().then(function (response) {
                $rootScope.servicesLoaded = true;
                if (!$rootScope.service) {
                    $rootScope.services = response.data;

                    if ($location.search().username) {
                        ManageService.getBy('username', $location.search().username).then(function (service) {
                            $rootScope.service = service;
                        });
                    }
                    if ($location.search().serviceId) {
                        ManageService.getBy('id', $location.search().serviceId).then(function (service) {
                            $rootScope.service = service;
                        });
                    }
                    if (!$rootScope.service) {
                        $rootScope.service = response.data[0];
                    }
                }
                return response.data;
            });
        }

        $rootScope.$on(AUTH_EVENTS.loginSuccess, initServices);
        if (AuthChecker.isAuthenticated()) {
            initServices();
        }

        /////////////////////////
        // Authentication system
        /////////////////////////

        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthChecker.isAuthorized;
        $scope.isAuthenticated = AuthChecker.isAuthenticated;
        $scope.currentSession = Session;
        $scope.logOut = $scope.logout  = function logOut () {
            AuthService.logout().then(function () {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
            });
        };

        function checkServices () {
            var userServices = $rootScope.services;
            var selectedService = $rootScope.service;
            var hasService = false;

            for (var i = 0; i < userServices.length; i++) {
                if (userServices[i].username === selectedService.username) {
                    hasService = true;
                    break;
                }
            }

            if (!hasService) {
                $rootScope.$broadcast('invalid-service');
                return;
            }
        }
        var originalPath = null;
        $rootScope.$on('routeSegmentChange', function (event, route) {
            var authorizedRoles = route.segment.params.authorizedRoles;
            if (!authorizedRoles) {
                authorizedRoles = [USER_ROLES.all];
            }

            if (!AuthChecker.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthChecker.isAuthenticated()) {
                    // user is not allowed
                    if (route.originalPath !== '/login') {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        return;
                    }
                } else {
                    // user is not logged in
                    if (route.originalPath !== '/login') {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        originalPath = route.originalPath;
                        return;
                    }
                }
            }

            if (!$rootScope.services) {
                initServices().then(checkServices);
            } else {
                checkServices();
            }
        });

        $rootScope.$on('invalid-service', function () {
            flash.to('alert-general').error = 'Access denied: Invalid service.';
            $location.path('/');
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
            if (originalPath === 'undefined' || !originalPath || originalPath === '/login') {
                originalPath = '/';
            }
            ManageService.invalidateCache().then(function onSuccess () {
                $location.path(originalPath);
            }, function onFail () {
                $window.location.reload();
            });
        });
        $rootScope.$on(AUTH_EVENTS.loginFailed, function() {
            flash.to('alert-log-in').error = 'Couldn\'t log in. Please check your credentials.';
        });
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
            $location.path('/login');
            flash.to('alert-general').success = 'You are now logged out!';
        });
        $rootScope.$on(AUTH_EVENTS.logoutFailed, function() {
            flash.to('alert-general').error = 'Something went wrong when trying to log out. Please try again. If the problem persists, reload the page and contact us.';
        });
        $rootScope.$on(AUTH_EVENTS.badRequest, function() {
            flash.to('alert-general').error = 'Something went wrong. Please try again. If the problem persists, reload the page and contact us.';
        });
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
            $location.path('/login');
            flash.to('alert-general').warning = 'Your session has expired. Please log in.';
        });
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
            $location.path('/login');
            flash.to('alert-general').warning = 'Please log in to continue.';
        });
        $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
            $location.path('/login');
            flash.to('alert-general').error = 'You can\'t do that as yourself. Log in as someone with more permission than you.';
        });
    });
});
