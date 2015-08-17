angular.module('control.manage.extra-services').factory('TuneInIntegrationService', function ($http, ENV) {
    return {
        saveSettings: function (username, settings) {
            return $http.put(ENV.apiEndpoint + '/control/tunein-air-integration/settings/' + username, settings);
        },
        removeSettings: function (username) {
            return $http.delete(ENV.apiEndpoint + '/control/tunein-air-integration/settings/' + username);
        },
        enable: function (username, settings) {
            settings.isEnabled = true;
            return $http.put(
                ENV.apiEndpoint + '/control/tunein-air-integration/settings/' + username,
                settings
            );
        },
        disable: function (username, settings) {
            settings.isEnabled = false;
            return $http.put(
                ENV.apiEndpoint + '/control/tunein-air-integration/settings/' + username,
                settings
            );
        },
    };
});
