angular.module('control').factory('ServerErrorInterceptor', function ($rootScope, $q) {
    return {
        responseError: function (response) {
            if (response.status === 500) {
                if (typeof response.data !== 'undefined' && typeof response.data.error !== 'undefined') {
                    return $q.reject(response);
                }
                var errorMessage = 'Something went wrong, and we don\'t have more specific info about the issue for now. Please try again. If this happens again, let us know as soon as possible.';
                $rootScope.$broadcast('server-error', {
                    code: 500,
                    message: errorMessage,
                    alertDuration: 30,
                });
            }
            if (response.status === 503) {
                $rootScope.$broadcast('server-error', {
                    code: response.status,
                    message: 'Our system is currently under maintenance. Please try again later. For more information, please refer to status.shoutca.st. We apologise for the inconvenience.',
                    alertDuration: 600,
                });
            }
            if (response.status === 502) {
                $rootScope.$broadcast('server-error', {
                    code: response.status,
                    message: 'Something went wrong while processing your request. Please try again. If this persists, please refer to status.shoutca.st for any known network issue. If there is no known issue, please let us know as soon as possible.',
                    alertDuration: 600,
                });
            }
            return $q.reject(response);
        },
    };
});
