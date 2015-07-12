angular.module('control.manage.extra-services').factory('RequestAppService', function ($http, ENV) {
    return {
        submit: function (platform, request) {
            return $http.post('https://' + ENV.apiEndpoint + '/control/apps/submit/' + platform + '/', request);
        }
    };
});
