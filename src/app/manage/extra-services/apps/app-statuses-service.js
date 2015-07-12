angular.module('control.manage.extra-services').factory('AppStatusesService', function ($http) {
    return {
        getStatuses: function () {
            return $http.get(
                'https://apps.shoutca.st/internal/statuses',
                { cache: true }
            ).then(function (data) {
                return data.data;
            });
        },
        getStatusesByValue: function () {
            return $http.get(
                'https://apps.shoutca.st/internal/statuses-by-value',
                { cache: true }
            ).then(function (data) {
                return data.data;
            });
        }
    };
});
