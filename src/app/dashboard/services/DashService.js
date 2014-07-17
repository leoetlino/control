define(['control'], function (control) {
    control.factory('DashService', function ($http, ENV) {
        return {
            getInfo: function (callback) {
                return $http.post('https://' + ENV.apiEndpoint + '/control/userInfo/').then(callback);
            }
        };
    });

});
