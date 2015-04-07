define(['control'], function (control) {
    control.factory('ManageService', function ($http, ENV, $rootScope) {
        return {
            getServicesList: function () {
                return $http.post('https://' + ENV.apiEndpoint + '/control/accounts/');
            },
            getSelectedService: function () {
                return this.getServicesList().then(function (response) {
                    $rootScope.servicesLoaded = true;
                    if (!$rootScope.service) {
                        $rootScope.services = response.data;
                        $rootScope.service = response.data[0];
                    }
                    return $rootScope.service;
                });
            }
        };
    });

});
