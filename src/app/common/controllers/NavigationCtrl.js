/* global define */
define(['control'], function (control) {
    control.controller('NavigationCtrl', function ($scope, $location, $rootScope, $route, USER_ROLES, AUTH_EVENTS, AuthChecker, AuthService, flash, Session, ManageService, $window) {

        ////////////////////
        // Helper functions
        ////////////////////

        $scope.isActive = function (viewLocation) {
            return (viewLocation === '/') ? viewLocation === $location.path() : $location.path().indexOf(viewLocation) > -1;
        };

        $rootScope.reloadServices = function () {
            ManageService.invalidateCache();
            return initServices();
        };

        $rootScope.$on('routeSegmentChange', function (index, route) {
            if (!route.segment) {
                return;
            }
            $rootScope.pageTitle = route.segment.params.title;
        });

        ////////////
        // Services
        ////////////

        function initServices () {
            // returns a promise.
            return ManageService.initAndGetService().then(function (service) {
                $rootScope.servicesLoaded = true;
                $rootScope.services = ManageService.getServicesList();
                $rootScope.service = service;
                return service;
            });
        }

        $rootScope.$on(AUTH_EVENTS.loginSuccess, initServices);
        if (AuthChecker.isAuthenticated()) {
            initServices();
        }

        $rootScope.$watch('service.username', function (newUsername) {
            if (newUsername && $location.search().username && (newUsername !== $location.search().username)) {
                $location.search('username', null);
                $location.search('serviceId', null);
            }
        });

        $rootScope.$watch('service.id', function (newId) {
            if (newId && $location.search().serviceId && (newId !== $location.search().serviceId)) {
                $location.search('username', null);
                $location.search('serviceId', null);
            }
        });

        /////////////////////////
        // Authentication system
        /////////////////////////

        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthChecker.isAuthorized;
        $scope.isAuthenticated = AuthChecker.isAuthenticated;
        $scope.currentSession = Session;
        $scope.logOut = $scope.logout = function logOut () {
            AuthService.logout().then(function () {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
            });
        };

        var originalPath = null;
        $rootScope.$on('$routeChangeStart', function (event, next) {
            var segment = control.segments[next.$$route.segment];
            var authorizedRoles;
            if (segment) {
                authorizedRoles = segment.params.authorizedRoles;
            }
            if (!authorizedRoles) {
                authorizedRoles = [USER_ROLES.all];
            }

            if (!AuthChecker.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthChecker.isAuthenticated()) {
                    // user is not allowed
                    if (next.originalPath !== '/log-in') {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        return;
                    }
                } else {
                    // user is not logged in
                    if (next.originalPath !== '/log-in') {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        originalPath = next.originalPath;
                        return;
                    }
                }
            }
        });

        $rootScope.$on('invalid-service', function () {
            flash.to('alert-general').error = 'Access denied: Invalid service.';
            $location.search('username', null);
            $location.search('serviceId', null);
            $location.path('/');
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            if (originalPath === 'undefined' || !originalPath || originalPath === '/log-in') {
                originalPath = '/';
            }
            ManageService.invalidateCache();
            return initServices().then(function onSuccess () {
                $location.path(originalPath);
            }, function onFail () {
                $window.location.reload();
            });
        });
        $rootScope.$on(AUTH_EVENTS.loginFailed, function() {
            flash.to('alert-log-in').error = 'Couldn\'t log in. Please check your credentials.';
        });
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
            $location.path('/log-in');
            flash.to('alert-general').success = 'You are now logged out!';
        });
        $rootScope.$on(AUTH_EVENTS.logoutFailed, function() {
            flash.to('alert-general').error = 'Something went wrong when trying to log out. Please try again. If the problem persists, reload the page and contact us.';
        });
        $rootScope.$on(AUTH_EVENTS.badRequest, function() {
            flash.to('alert-general').error = 'Something went wrong. Please try again. If the problem persists, reload the page and contact us.';
        });
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
            $location.path('/log-in');
            flash.to('alert-general').warning = 'Your session has expired. Please log in.';
        });
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
            $location.path('/log-in');
            flash.to('alert-general').warning = 'Please log in to continue.';
        });
        $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
            $location.path('/log-in');
            flash.to('alert-general').error = 'You can\'t do that as yourself. Log in as someone with more permission than you.';
        });
    });
});
