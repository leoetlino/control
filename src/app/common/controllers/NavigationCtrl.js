/* global define */
define(['control'], function(control) {
    control.controller('NavigationCtrl', function($scope, $location, $rootScope, $route, USER_ROLES, AUTH_EVENTS, AuthChecker, AuthService, flash, Session, ManageService) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthChecker.isAuthorized;
        $scope.isAuthenticated = AuthChecker.isAuthenticated;
        $scope.currentSession = Session;
        $scope.logout = function() {
            AuthService.logout().then(function () {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
            });
        };

        $scope.isActive = function (viewLocation) {
            return (viewLocation === '/') ? viewLocation === $location.path() : $location.path().indexOf(viewLocation) > -1;
        };
        var originalPath = null;
        $rootScope.$on ('$routeChangeStart', function(event, next) {
            var authorizedRoles = next.authorizedRoles;
            if (!authorizedRoles) {
                authorizedRoles = [USER_ROLES.all];
            }

            if (!AuthChecker.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthChecker.isAuthenticated()) {
                    // user is not allowed
                    if (next.originalPath !== '/login') {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        return;
                    }
                } else {
                    // user is not logged in
                    if (next.originalPath !== '/login') {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        originalPath = next.originalPath;
                        return;
                    }
                }
            }

            if (next.originalPath !== '/login') {
                $location.search('apiMock', 'true');
            }
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.pageTitle = $route.current.title;
        });

        // Authorisation system
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
            if (originalPath === 'undefined' || !originalPath || originalPath === '/login') {
                originalPath = '/';
            }
            $location.path(originalPath);
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

        function initServices () {
            $rootScope.service = null;
            $rootScope.services = ManageService.getServicesList().then(function (response) {
                $rootScope.servicesLoaded = true;
                $rootScope.service = response.data[0].id;
                return response.data;
            });
        }

        $rootScope.$on(AUTH_EVENTS.loginSuccess, initServices);
        if (AuthChecker.isAuthenticated()) {
            initServices();
        }

        $rootScope.$watch('service', function (newId, oldId) {
            if (!oldId || oldId === newId) {
                return;
            }
            $route.reload();
        });
    });
});
