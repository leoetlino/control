define(['control'], function (control) {
    control.controller('LoginCtrl', function($scope, $rootScope, AUTH_EVENTS, AuthService) {
        $scope.credentials = {
            email: '',
            password: ''
        };
        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function() {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }, function() {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
        $scope.logout = function(credentials) {
            AuthService.logout(credentials).then(function() {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            }, function() {
                $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
            });
        };
    }).constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        logoutFailed: 'auth-logout-failed',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized',
        badRequest: 'auth-bad-request'
    }).constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        user: 'user',
        public: 'public'
    });
});
