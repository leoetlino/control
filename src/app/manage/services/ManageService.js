define(['control'], function (control) {
    control.factory('ManageService', function ($http, ENV) {
        return {
            getServicesList: function () {
                return $http.post('https://' + ENV.apiEndpoint + '/control/accounts/');
            }
        };
    });

});
