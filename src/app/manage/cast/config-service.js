angular.module('control.manage.cast').factory('ConfigService', function ($http, ENV, promiseCache, $rootScope, $q) {
    this.invalidateCache = function () {
        promiseCache.remove('castConfig');
    };

    this.getConfig = function () {
        var username = $rootScope.service.username;
        if ($rootScope.service.group.toLowerCase().indexOf('nodes') === -1) {
            $rootScope.$broadcast('cast-only-route');
            return $q.reject('selected service is a non-Cast service');
        }
        return promiseCache({
            promise: function () {
                return $http
                    .get(ENV.apiEndpoint + '/control/cast/configuration/' + username)
                    .then(function (response) {
                        return response.data;
                    });
            },
            key: 'castConfig',
            ttl: -1,
        });
    };

    $rootScope.$on('selected-service-changed', this.invalidateCache);
    $rootScope.$on('invalidate-cast-config-cache', this.invalidateCache);

    return this;
});
