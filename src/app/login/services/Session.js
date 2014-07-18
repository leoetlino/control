define(['control'], function (control) {
    control.service('Session', function (USER_ROLES, localStorageService) {
        return {
            create: function (token) {
                this.token = token;
                this.userRole = [USER_ROLES.user];
                localStorageService.set('token', token);
            },

            update: function (token) {
                this.destroy();
                this.create(token);
            },

            createFromLocalStorage: function () {
                this.token = localStorageService.get('token');
                this.userRole = [USER_ROLES.user];
            },

            destroy: function () {
                this.token = null;
                this.userRole = null;
                localStorageService.remove('token');
            }
        };
    });
});
