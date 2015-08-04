angular.module('control.manage.cast').factory('StreamsService', function ($http, ENV, $rootScope) {
    var StreamsService = {};

    /**
     * Save the streams config
     * @param {Array} config - An array of streams
     */
    StreamsService.saveConfig = function (config) {
        return $http.post('https://' + ENV.apiEndpoint + '/control/cast/streams/save', {
            username: $rootScope.service.username,
            streams: config,
        });
    };

    return StreamsService;
});
