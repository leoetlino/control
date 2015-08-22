angular.module('control.manage.extra-services').factory('TuneInIntegrationService', function ($http, ENV, promiseCache, $rootScope) {
    var TuneInIntegrationService = {
        saveSettings: function (username, settings) {
            this.invalidateCache();
            settings.disableReason = '';
            return $http.put(ENV.apiEndpoint + '/control/tunein-air-integration/settings/' + username, settings);
        },
        removeSettings: function (username) {
            this.invalidateCache();
            return $http.delete(ENV.apiEndpoint + '/control/tunein-air-integration/settings/' + username);
        },
        enable: function (username, settings) {
            this.invalidateCache();
            settings.isEnabled = true;
            return $http.put(
                ENV.apiEndpoint + '/control/tunein-air-integration/settings/' + username,
                settings
            );
        },
        disable: function (username, settings) {
            this.invalidateCache();
            settings.isEnabled = false;
            return $http.put(
                ENV.apiEndpoint + '/control/tunein-air-integration/settings/' + username,
                settings
            );
        },
        invalidateCache: function () {
            promiseCache.remove('tuneInIntegrationSettings');
        },
        getSettings: function () {
            var username = $rootScope.service.username;
            return promiseCache({
                promise: function () {
                    return $http
                        .get(ENV.apiEndpoint + '/control/tunein-air-integration/settings/' + username)
                        .then(function (response) {
                            return response.data;
                        });
                },
                key: 'tuneInIntegrationSettings',
                ttl: -1,
            });
        },
    };

    $rootScope.$on('selected-service-changed', this.invalidateCache);
    return TuneInIntegrationService;
});
