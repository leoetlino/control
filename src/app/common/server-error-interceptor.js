control.factory('ServerErrorInterceptor', function ($rootScope, $q) {
    return {
        responseError: function (response) {
            if (response.status === 500) {
                var errorMessage = (typeof response.data !== 'undefined' && typeof response.data.error !== 'undefined') ? response.data.error : 'Something went wrong. Please try again. If this happens again, let us know as soon as possible.';
                $rootScope.$broadcast('server-error', {
                    code: 500,
                    message: errorMessage,
                    alertDuration: 30
                });
            }
            if (response.status === 503 || response.status === 502) {
                $rootScope.$broadcast('server-error', {
                    code: response.status,
                    message: 'Control is currently unavailable. Please try again later. If this persists, please refer to status.shoutca.st for any known network issue.',
                    alertDuration: 600
                });
            }
            return $q.reject(response);
        }
    };
});
