/* global define */
define(['control'], function (control) {
    control.factory('NowPlayingTweetsService', function ($http, ENV) {
        return {
            submitSettings: function (username, settings) {
                settings.username = username;
                return $http.post('https://' + ENV.apiEndpoint + '/control/now-playing/update-settings', settings);
            },
            enable: function (username) {
                return $http.post('https://' + ENV.apiEndpoint + '/control/now-playing/enable', { username: username });
            },
            disable: function (username) {
                return $http.post('https://' + ENV.apiEndpoint + '/control/now-playing/disable', { username: username });
            }
        };
    });

});
