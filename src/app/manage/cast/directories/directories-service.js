angular.module('control.manage.cast').factory('DirectoriesService', function ($http, ENV, promiseCache, $rootScope) {
    this.getChoices = function () {
        return promiseCache({
            promise: function () {
                return $http
                    .get(ENV.apiEndpoint + '/control/cast/directories/get-supported')
                    .then(function (response) {
                        return response.data;
                    });
            },
            ttl: -1,
        });
    };

    this.enableDirectory = function (directory) {
        var username = $rootScope.service.username;
        return $http.post(
            ENV.apiEndpoint + '/control/cast/directories/enable/' + username,
            { directory: directory }
        );
    };

    this.disableDirectory = function (directory) {
        var username = $rootScope.service.username;
        return $http.post(
            ENV.apiEndpoint + '/control/cast/directories/disable/' + username,
            { directory: directory }
        );
    };

    return this;
});
