angular.module('control').factory('HttpTimeoutInterceptor', function ($q, $window) {
    return {
        'request': function (config) {
            config.timeout = 20000;
            return config;
        },
        responseError: function (response) {
            if (response.status === -1) {
                $window.alert('Control is currently unavailable. Please try again later. If this occurs again, let us know as soon as possible.');
            }
            return $q.reject(response);
        },
    };
});
