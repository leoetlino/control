control.factory('ManageService', function ($http, ENV, $rootScope, $location) {
    var internal = {
        promise: null,
        cachedServices: null
    };
    var instance = {
        invalidateCache: function () {
            internal.promise = null;
            internal.cachedServices = null;
        },
        initAndGetService: function () {
            return instance.getServicesPromise().then(instance.getSelectedService);
        },
        initAndGetServices: function () {
            return instance.getServicesPromise().then(instance.getServicesList);
        },
        getServicesPromise: function () {
            if (internal.promise) {
                return internal.promise;
            }
            internal.promise = $http.post('https://' + ENV.apiEndpoint + '/control/accounts/');
            return internal.promise.then(function (response) {
                internal.cachedServices = response.data;
            });
        },
        getServicesList: function () {
            return _.filter(internal.cachedServices, function (service) {
                return (service.status === 'Active') &&
                    ((service.group.toLowerCase().indexOf('servers') !== -1) ||
                    (service.group.toLowerCase().indexOf('nodes') !== -1)) &&
                    (service.name.toLowerCase().indexOf('free') === -1);
            });
        },
        getSelectedService: function () {
            var service;
            if ($location.search().username) {
                service = instance.getBy('username', $location.search().username);
                if (!service) {
                    $rootScope.$broadcast('invalid-service');
                }
            }
            if ($location.search().serviceId) {
                service = instance.getBy('id', $location.search().serviceId);
                if (!service) {
                    $rootScope.$broadcast('invalid-service');
                }
            }
            if ($rootScope.service) {
                service = _.findWhere(instance.getServicesList(), { id: $rootScope.service.id });
                if (!service) {
                    $rootScope.$broadcast('invalid-service');
                }
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
