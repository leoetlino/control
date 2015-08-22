angular.module('control.manage.extra-services').factory('NowPlayingTweetsService', function ($http, ENV, promiseCache, $rootScope) {
    var NowPlayingTweetsService = {
        submitSettings: function (username, settings) {
            this.invalidateCache();
            settings.disableReason = '';
            return $http.put(ENV.apiEndpoint + '/control/now-playing-tweets/settings/' + username, settings);
        },
        enable: function (username, settings) {
            this.invalidateCache();
            settings.isEnabled = true;
            return $http.put(
                ENV.apiEndpoint + '/control/now-playing-tweets/settings/' + username,
                settings
            );
        },
        disable: function (username, settings) {
            this.invalidateCache();
            settings.isEnabled = false;
            return $http.put(
                ENV.apiEndpoint + '/control/now-playing-tweets/settings/' + username,
                settings
            );
        },
        removeSettings: function (username) {
            this.invalidateCache();
            return $http.delete(ENV.apiEndpoint + '/control/now-playing-tweets/settings/' + username);
        },
        invalidateCache: function () {
            promiseCache.remove('nowPlayingTweetsSettings');
        },
        getSettings: function () {
            var username = $rootScope.service.username;
            return promiseCache({
                promise: function () {
                    return $http
                        .get(ENV.apiEndpoint + '/control/now-playing-tweets/settings/' + username)
                        .then(function (response) {
                            return response.data;
                        });
                },
                key: 'nowPlayingTweetsSettings',
                ttl: -1,
            });
        },
    };

    $rootScope.$on('selected-service-changed', this.invalidateCache);
    return NowPlayingTweetsService;
});
