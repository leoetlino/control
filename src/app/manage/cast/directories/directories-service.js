angular.module('control.manage.cast').factory('DirectoriesService', function ($http, ENV, promiseCache, $rootScope) {
    this.getChoices = function () {
        var username = $rootScope.service.username;
        return promiseCache({
            promise: function () {
                return $http
                    .post('https://' + ENV.apiEndpoint + '/control/cast/directories/get-supported', { username: username })
                    .then(function (response) {
                        return response.data;
                    });
            },
            ttl: -1
        });
    };

    this.enableDirectory = function (directory) {
        return $http.post(
                'https://' + ENV.apiEndpoint + '/control/cast/directories/enable',
                _.extend({ username: $rootScope.service.username }, { directory: directory })
            );
    };

    this.disableDirectory = function (directory) {
        return $http.post(
                'https://' + ENV.apiEndpoint + '/control/cast/directories/disable',
                _.extend({ username: $rootScope.service.username }, { directory: directory })
            );
    };

    return this;
});
