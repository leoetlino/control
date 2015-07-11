control.factory('ServerErrorInterceptor', function ($rootScope, $q, $window) {
    return {
        responseError: function (response) {
            if (response.status === 500) {
                var errorMessage = (typeof response.data !== 'undefined' && typeof response.data.error !== 'undefined') ? response.data.error : 'Something went wrong... please try again! If this happens again, let us know as soon as possible.';
                $window.alert(errorMessage);
            }
            if (response.status === 503) {
                $window.alert('Control is currently unavailable. Please try again later.');
            }
            return $q.reject(response);
        }
    };
});
