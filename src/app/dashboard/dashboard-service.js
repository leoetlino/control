control.factory('DashService', function ($http, ENV, promiseCache, Session, $q) {
    return {
        getInfo: function () {
            if (!Session.token) {
                return $q.reject('no valid token');
            }
            return promiseCache({
                promise: function () {
                    return $http.post('https://' + ENV.apiEndpoint + '/control/userInfo/');
                },
                ttl: -1,
            });
        },
    };
});
