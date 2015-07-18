angular.module('control.manage.cast').factory('StatisticsService', function ($http) {
    var StatisticsService = {};

    StatisticsService.getListeners = function (hostname, stream, apiKey) {
        return $http.get(hostname + '/api/' + stream + '/' + apiKey + '/listeners').then(function (res) {
            return res.data;
        });
    };

    return StatisticsService;
});
