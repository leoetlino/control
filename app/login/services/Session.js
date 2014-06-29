define(['control'], function (control) {
    control.service('Session', function (USER_ROLES, localStorageService) {
        this.create = function (token, email) {
            this.token = token;
            this.email = email;
            this.userRole = [USER_ROLES.user];
            localStorageService.set('token', token);
            localStorageService.set('email', email);
        };

        this.createFromLocalStorage = function () {
            this.token = localStorageService.get('token');
            this.email = localStorageService.get('email');
            this.userRole = [USER_ROLES.user];
        };

        this.destroy = function () {
            this.token = null;
            this.email = null;
            this.userRole = null;
            localStorageService.remove('token');
            localStorageService.remove('email');
        };
        return this;
    });
});
