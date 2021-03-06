import { lodash as _ } from "../vendor";

/*@ngInject*/
export default function ServicesService($http, ENV, $rootScope, $location, promiseCache, localStorageService) {
  var internal = {
    cachedServices: null,
  };
  var instance = {
    invalidateCache: function () {
      promiseCache.removeAll();
      internal.cachedServices = null;
    },
    setServices: function (services) {
      internal.cachedServices = services;
    },
    initAndGetService: function () {
      return instance.getServicesPromise().then(instance.getSelectedService);
    },
    initAndGetServices: function () {
      return instance.getServicesPromise().then(instance.getServicesList);
    },
    getServicesPromise: function () {
      return promiseCache({
        promise: function () {
          return $http
                        .get(ENV.apiEndpoint + "/control/products")
                        .then(function (response) {
                          internal.cachedServices = response.data;
                          return response.data;
                        });
        },
        ttl: -1,
      });
    },
    getServicesList: function () {
      return _.filter(internal.cachedServices, function (service) {
        return (service.status === "Active") &&
                    ((service.group.toLowerCase().indexOf("servers") !== -1) ||
                     (service.group.toLowerCase().indexOf("nodes") !== -1)) &&
                    (service.name.toLowerCase().indexOf("free") === -1);
      });
    },
    getSelectedService: function () {
      var service;
      var lastServiceId = instance.getLastUsedServiceId();
      if (lastServiceId) {
        service = _.findWhere(instance.getServicesList(), { id: lastServiceId });
        if (!service) {
          instance.removeLastUsedServiceId();
          $rootScope.$broadcast("invalid-service");
        }
      }
      if ($location.search().username) {
        service = instance.getBy("username", $location.search().username);
        if (!service) {
          $rootScope.$broadcast("invalid-service");
        }
      }
      if ($location.search().serviceId) {
        service = instance.getBy("id", $location.search().serviceId);
        if (!service) {
          $rootScope.$broadcast("invalid-service");
        }
      }
      if ($rootScope.service) {
        service = _.findWhere(instance.getServicesList(), { id: $rootScope.service.id });
        if (!service) {
          $rootScope.$broadcast("invalid-service");
        }
      }
            // Last resort
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
    },
    saveLastUsedServiceId: function (serviceId) {
      return localStorageService.set("serviceId", serviceId);
    },
    getLastUsedServiceId: function () {
      return localStorageService.get("serviceId");
    },
    removeLastUsedServiceId: function () {
      return localStorageService.remove("serviceId");
    },
  };
  $rootScope.$on("invalidate-services-cache", instance.invalidateCache);
  $rootScope.$on("selected-service-changed", function (event, serviceId) {
    instance.saveLastUsedServiceId(serviceId);
  });
  return instance;
}
