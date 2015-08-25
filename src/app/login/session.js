angular.module('control').service('Session', function (USER_ROLES, localStorageService, $rootScope) {
    return {
        create: function (token) {
            this.token = token;
            this.userRole = [USER_ROLES.user];
            localStorageService.set('token', token);
            $rootScope.$broadcast('sessionCreated');
        },

        update: function (token) {
            this.token = token;
            localStorageService.set('token', token);
            $rootScope.$broadcast('sessionUpdated');
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
