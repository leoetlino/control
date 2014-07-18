/* global define */
define(['control'], function(control) {
    control.controller('NavigationCtrl', function($scope, $location, $rootScope, $route, USER_ROLES, AUTH_EVENTS, AuthService, flash, Session) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;
        $scope.isAuthenticated = AuthService.isAuthenticated;
        $scope.currentSession = Session;
        $scope.logout = function() {
            AuthService.logout();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        var originalPath = null;
        $rootScope.$on('$routeChangeStart', function(event, next) {
            var authorizedRoles = next.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    if (next.originalPath !== '/login') {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    }
                } else {
                    // user is not logged in
                    if (next.originalPath !== '/login') {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        originalPath = next.originalPath;
                    }
                }
            } else {
                if (next.originalPath === '/login' && AuthService.isReallyAuthenticated()) {
                    $location.path('/');
                }
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
            flash.to('alert-log-in').error = 'Couldn\'t login. Please check your credentials.';
        });
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
            flash.to('alert-general').success = 'You are now logged out!';
            $location.path('/login');
        });
        $rootScope.$on(AUTH_EVENTS.logoutFailed, function() {
            flash.to('alert-general').error = 'Something went wrong when trying to log out. Please try again. If the problem persists, reload the page and contact us.';
        });
        $rootScope.$on(AUTH_EVENTS.badRequest, function() {
            flash.to('alert-general').error = 'Something went wrong. Please try again. If the problem persists, reload the page and contact us.';
        });
        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
            flash.to('alert-log-in').warning = 'Your session has expired. Please log in.';
            $location.path('/login');
        });
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
            flash.to('alert-log-in').warning = 'Please log in to continue.';
            $location.path('/login');
        });
        $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
            flash.to('alert-log-in').error = 'You can\'t do that as yourself. Log in as someone with more permission than you.';
            $location.path('/login');
        });
    });
});
