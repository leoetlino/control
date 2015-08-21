angular.module('control.manage.extra-services').factory('NowPlayingTweetsService', function ($http, ENV) {
    return {
        submitSettings: function (username, settings) {
            settings.disableReason = '';
            return $http.put(ENV.apiEndpoint + '/control/now-playing-tweets/settings/' + username, settings);
        },
        enable: function (username, settings) {
            settings.isEnabled = true;
            return $http.put(
                ENV.apiEndpoint + '/control/now-playing-tweets/settings/' + username,
                settings
            );
        },
        disable: function (username, settings) {
            settings.isEnabled = false;
            return $http.put(
                ENV.apiEndpoint + '/control/now-playing-tweets/settings/' + username,
                settings
            );
        },
        removeSettings: function (username) {
            return $http.delete(ENV.apiEndpoint + '/control/now-playing-tweets/settings/' + username);
        },
    };
});
