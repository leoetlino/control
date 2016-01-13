export default /*@ngInject*/ function TuneInIntegrationServiceFactory ($http, ENV, promiseCache, $rootScope) {
  var TuneInIntegrationService = {
    saveSettings: function (username, settings) {
      this.invalidateCache();
      settings.disableReason = "";
      return $http.put(ENV.apiEndpoint + "/control/tunein-air-integration/settings/" + username, settings);
    },
    removeSettings: function (username) {
      this.invalidateCache();
      return $http.delete(ENV.apiEndpoint + "/control/tunein-air-integration/settings/" + username);
    },
    enable: function (username, settings) {
      this.invalidateCache();
      settings.isEnabled = true;
      return $http.put(
                ENV.apiEndpoint + "/control/tunein-air-integration/settings/" + username,
                settings
            );
    },
    disable: function (username, settings) {
      this.invalidateCache();
      settings.isEnabled = false;
      return $http.put(
                ENV.apiEndpoint + "/control/tunein-air-integration/settings/" + username,
                settings
            );
    },
    invalidateCache: function () {
      if (!$rootScope.service) {
        return;
      }
      var username = $rootScope.service.username;
      promiseCache.remove("tuneInIntegrationSettings_" + username);
    },
    getSettings: function () {
      if (!$rootScope.service) {
        return;
      }
      var username = $rootScope.service.username;
      return promiseCache({
        promise: function () {
          return $http
                        .get(ENV.apiEndpoint + "/control/tunein-air-integration/settings/" + username)
                        .then(function (response) {
                          return response.data;
                        });
        },
        key: "tuneInIntegrationSettings_" + username,
        ttl: -1,
      });
    },
  };

  return TuneInIntegrationService;
}
