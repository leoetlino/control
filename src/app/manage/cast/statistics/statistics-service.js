angular.module('control.manage.cast').factory('StatisticsService', function ($http) {
    var StatisticsService = {};

    /**
     * Get listeners
     * @param [Array] listeners - An array of listeners
     */
    StatisticsService.getListeners = function (url) {
        return $http.get(url);
    };

    return StatisticsService;
});
