define(['control'], function (control) {
    control.factory('ManageService', function ($http, ENV, $rootScope, $location) {
        var private = {
            promise: null,
            cachedServices: null
        };
        var instance = {
            invalidateCache: function () {
                private.promise = null;
                private.cachedServices = null;
                return instance.getServicesPromise();
            },
            initAndGetService: function () {
                return instance.getServicesPromise().then(instance.getSelectedService);
            },
            getServicesPromise: function () {
                if (private.promise) {
                    return private.promise;
                }
                private.promise = $http.post('https://' + ENV.apiEndpoint + '/control/accounts/');
                return private.promise.then(function (response) {
                    private.cachedServices = response.data;
                });
            },
            getServicesList: function () {
                return private.cachedServices;
            },
            getSelectedService: function () {
                var service;
                if ($location.search().username) {
                    service = instance.getBy('username', $location.search().username);
                }
                if ($location.search().serviceId) {
                    service = instance.getBy('id', $location.search().serviceId);
                }
                if ($rootScope.service) {
                    service = _.findWhere(instance.getServicesList(), { id: $rootScope.service.id });
                }
                if (!service) {
                    service = instance.getServicesList()[0];
                }
                return service;
            },
            getBy: function (key, value) {
                var service;
                instance.getServicesList().forEach(function (serviceToCheck) {
                    if (serviceToCheck[key] === value) {
                        service = serviceToCheck;
                    }
                });
                return service;
            }
        };
        return instance;
    });
});
