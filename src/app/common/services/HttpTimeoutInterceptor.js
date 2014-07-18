/* global define */
define(['control'], function (control) {
    control.factory('HttpTimeoutInterceptor', function ($q, $ngBootbox) {
        return {
            'request': function(config) {
                config.timeout = 10000;
                return config;
            },
            responseError: function (response) {
                if (response.status === -1) {
                    $ngBootbox.alert('Control is currently unavailable. Please try again later. If this occurs again, let us know as soon as possible.');
                }
                return $q.reject(response);
            }
        };
    });
});
