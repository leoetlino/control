control.factory('TuneInIntegrationService', function ($http, ENV) {
    return {
        saveSettings: function (username, settings) {
            settings.username = username;
            return $http.post('https://' + ENV.apiEndpoint + '/control/tunein-integration/save-settings', settings);
        },
        removeSettings: function (username) {
            return $http.post('https://' + ENV.apiEndpoint + '/control/tunein-integration/remove-settings', { username: username });
        },
        enable: function (username) {
            return $http.post('https://' + ENV.apiEndpoint + '/control/tunein-integration/enable', { username: username });
        },
        disable: function (username) {
            return $http.post('https://' + ENV.apiEndpoint + '/control/tunein-integration/disable', { username: username });
        },
    };
});
