define(['control'], function (control) {
    control.service('Session', function (USER_ROLES, localStorageService) {
        this.create = function (token) {
            this.token = token;
            this.userRole = [USER_ROLES.user];
            localStorageService.set('token', token);
        };

        this.update = function (token) {
            this.destroy();
            this.create(token);
        };

        this.createFromLocalStorage = function () {
            this.token = localStorageService.get('token');
            this.userRole = [USER_ROLES.user];
        };

        this.destroy = function () {
            this.token = null;
            this.userRole = null;
            localStorageService.remove('token');
        };
        return this;
    });
});
