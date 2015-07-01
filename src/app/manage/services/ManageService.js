define(['control'], function (control) {
    control.factory('ManageService', function ($http, ENV, $rootScope) {
        return {
            promise: null,
            invalidateCache: function () {
                this.promise = null;
                return this.getServicesList();
            },
            getServicesList: function () {
                if (this.promise) {
                    return this.promise;
                }
                this.promise = $http.post('https://' + ENV.apiEndpoint + '/control/accounts/');
                return this.promise;
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
