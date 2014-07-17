define(['control'], function (control) {
    control.factory('AuthService', function ($http, Session, USER_ROLES, localStorageService, ENV) {
        return {
            login: function (credentials) {
                return $http
                    .post('https://' + ENV.apiEndpoint + '/control/login/', credentials)
                    .then(function (res) {
                        Session.create(res.data.key, res.data.email);
                    });
            },
            logout: function (credentials) {
                return $http
                    .post('https://' + ENV.apiEndpoint + '/control/logout/', credentials)
                    .then(function () {
                        Session.destroy();
                    });
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
            }
        };
    });

});
