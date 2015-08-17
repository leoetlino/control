angular.module('control.manage.cast').factory('StreamsService', function ($http, ENV, $rootScope) {
    var StreamsService = {};

    /**
     * Save the streams config
     * @param {Array} config - An array of streams
     */
    StreamsService.saveConfig = function (config) {
        var username = $rootScope.service.username;
        return $http.put(ENV.apiEndpoint + '/control/cast/streams/' + username, config);
    };

    return StreamsService;
});
