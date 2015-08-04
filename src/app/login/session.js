control.service('Session', function (USER_ROLES, localStorageService, $rootScope) {
    return {
        create: function (token) {
            this.token = token;
            this.userRole = [USER_ROLES.user];
            localStorageService.set('token', token);
            $rootScope.$broadcast('sessionCreated');
        },

        update: function (token) {
            this.destroy();
            this.create(token);
        },

        createFromLocalStorage: function () {
            this.create(localStorageService.get('token'));
        },

        destroy: function () {
            this.token = null;
            this.userRole = null;
            localStorageService.remove('token');
            $rootScope.$broadcast('sessionDestroyed');
        },
    };
});
