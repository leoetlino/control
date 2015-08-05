control.factory('AuthChecker', function ($http, Session, USER_ROLES, localStorageService) {
    return {
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
    };
});
