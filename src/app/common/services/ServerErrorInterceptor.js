/* global define */
define(['control'], function (control) {
    control.factory('ServerErrorInterceptor', function ($rootScope, $q, $ngBootbox) {
        return {
            responseError: function (response) {
                if (response.status === 500) {
                    $ngBootbox.alert('Something went wrong... please try again! If this happens again, let us know as soon as possible.');
                }
                if (response.status === 503) {
                    $ngBootbox.alert('Control is currently unavailable. Please try again later.');
                }
                return $q.reject(response);
            }
        };
    });
});
