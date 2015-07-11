control.factory('DashService', function ($http, ENV) {
    return {
        getInfo: function () {
            return $http.post('https://' + ENV.apiEndpoint + '/control/userInfo/');
        }
    };
});
