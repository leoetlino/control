define(['control'], function (control) {
    control.factory('AuthService', function ($http, Session, USER_ROLES, localStorageService, ENV) {
        return {
            login: function (credentials) {
                return $http
                    .post('https://' + ENV.apiEndpoint + '/authenticate', credentials)
                    .then(function (res) {
                        Session.create(res.data.token);
                    });
            },
            logout: function () {
                Session.destroy();
            },
            isAuthenticated: function () {
                if (localStorageService.get('token') !== 'undefined' && localStorageService.get('token') !== null) {
                    Session.createFromLocalStorage();
                }
                return !!Session.token;
            },
            isReallyAuthenticated: function () {
                var interceptors = control.$httpProvider.interceptors;
                // temporarily disable AuthInterceptor
                interceptors.splice(interceptors.indexOf('AuthInterceptor'), 1);
                $http.post('https://' + ENV.apiEndpoint + '/control/check/')
                    .then(function () {
                        interceptors.push('AuthInterceptor');
                        return true;
                    }, function () {
                        interceptors.push('AuthInterceptor');
                        return false;
                    });
                return null;
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
