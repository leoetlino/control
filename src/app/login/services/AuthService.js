define(['control'], function (control) {
    control.factory('AuthService', function ($http, Session, USER_ROLES, localStorageService, ENV, $interval) {
        return {
            login: function (credentials) {
                return $http
                    .post('https://' + ENV.apiEndpoint + '/authenticate', credentials)
                    .then(function (res) {
                        Session.create(res.data.token);
                        this.keepAlivePromise = $interval(this.keepAlive, 1000 * 60 * 25);
                    });
            },
            logout: function () {
                Session.destroy();
                if (angular.isDefined(this.keepAlivePromise)) {
                    $interval.cancel(this.keepAlivePromise);
                    this.keepAlivePromise = null;
                }
            },
            isAuthenticated: function () {
                if (localStorageService.get('token') !== 'undefined' && localStorageService.get('token') !== null) {
                    Session.createFromLocalStorage();
                }
                return !!Session.token;
            },
            isAuthorized: function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                if (authorizedRoles.indexOf(USER_ROLES.public) !== -1) {
                    return true;
                }
                if (authorizedRoles.indexOf(USER_ROLES.all) !== -1 && this.isAuthenticated()) {
                    return true;
                }
                return (this.isAuthenticated() &&
                    authorizedRoles.indexOf(Session.userRole) !== -1);
            },
            keepAlivePromise: null,
            keepAlive: function () {

            }
        };
    });

});
