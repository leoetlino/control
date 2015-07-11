control.factory('AuthService', function ($http, Session, USER_ROLES, localStorageService, ENV, AuthChecker, $rootScope, $interval, AUTH_EVENTS) {
    var AuthService = {
        login: function (credentials) {
            return $http
                .post('https://' + ENV.apiEndpoint + '/authenticate', credentials)
                .then(function (res) {
                    Session.create(res.data.token);
                });
        },
        logout: function () {
            return $http
                .post('https://' + ENV.apiEndpoint + '/control/log-out')
                .then(function () {
                    Session.destroy();
                });
        },
        keepAlivePromise: null,
        keepAlive: function () {
            $http.post('https://' + ENV.apiEndpoint + '/control/keep-alive')
                .then(function (res) {
                    Session.update(res.data.token);
                }, function (response) {
                    $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
                });
        }
    };

    $rootScope.$on('sessionCreated', function onSessionCreated () {
        AuthService.keepAlivePromise = $interval(AuthService.keepAlive, 1000 * 60 * 15);
    });
    $rootScope.$on('sessionDestroyed', function onSessionDestroyed () {
        if (angular.isDefined(AuthService.keepAlivePromise)) {
            $interval.cancel(AuthService.keepAlivePromise);
            AuthService.keepAlivePromise = null;
        }
    });

    return AuthService;
});
