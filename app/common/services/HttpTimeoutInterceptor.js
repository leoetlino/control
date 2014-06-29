/* global define */
define(['control'], function (control) {
    control.factory('HttpTimeoutInterceptor', function () {
        return {
            'request': function(config) {
                config.timeout = 10000;
                return config;
            }
        };
    });
});
