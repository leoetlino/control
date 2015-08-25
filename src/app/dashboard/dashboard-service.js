angular.module('control').factory('DashService', function ($http, ENV, promiseCache, Session, $q) {
    return {
        getInfo: function () {
            if (!Session.token) {
                return $q.reject('no valid token');
            }
            return promiseCache({
                promise: function () {
                    return $http.get(ENV.apiEndpoint + '/control/user-info');
                },
                ttl: -1,
            });
        },
    };
});
