control.controller('LoginCtrl', function($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
        email: '',
        password: ''
    };
    $scope.isLoading = false;
    $scope.login = function(credentials) {
        $scope.isLoading = true;
        AuthService.login(credentials).then(function() {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.isLoading = false;
        }, function() {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.isLoading = false;
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
