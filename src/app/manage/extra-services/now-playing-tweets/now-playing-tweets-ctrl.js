angular.module('control.manage.extra-services').controller('NowPlayingTweetsCtrl', function ($rootScope, $scope, NowPlayingTweetsService, ENV, $routeParams, $location, $alert) {

    // Initialisation
    var initialiseSettings = function () {
        $scope.nowPlayingState = $rootScope.service.nowPlayingTweets.isEnabled;
        $scope.settings = {};
        $rootScope.service.nowPlayingTweets = $rootScope.service.nowPlayingTweets || {};
        $scope.settings.tweet = $rootScope.service.nowPlayingTweets.tweet || '#NowPlaying %title - %artist';
        $scope.settings.mode = $rootScope.service.nowPlayingTweets.mode || 'interval';
        $scope.settings.interval = $rootScope.service.nowPlayingTweets.interval || 5;
        $scope.settings.consumerKey = $rootScope.service.nowPlayingTweets.consumerKey;
        $scope.settings.consumerSecret = $rootScope.service.nowPlayingTweets.consumerSecret;
        $scope.settings.accessToken = $rootScope.service.nowPlayingTweets.accessToken;
        $scope.settings.accessTokenSecret = $rootScope.service.nowPlayingTweets.accessTokenSecret;
    };
    initialiseSettings();

    $scope.submitting = false;

    // Functions
    var changeStateSuccess = function () {
        $scope.submitting = false;
    };

    var changeStateFailure = function (oldValue) {
        $alert({
            content: 'Could not enable/disable #NowPlaying. Please try again.',
            type: 'danger',
            duration: 10,
        });
        unregisterWatch();
        $scope.nowPlayingState = oldValue;
        watchNowPlayingSwitch();
        $scope.submitting = false;
    };

    var unregisterWatch;
    var watchNowPlayingSwitch = function () {
        unregisterWatch = $scope.$watch('nowPlayingState', function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            $scope.submitting = true;
            if ($scope.nowPlayingState) {
                NowPlayingTweetsService.enable($rootScope.service.username, $scope.settings).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
            } else {
                NowPlayingTweetsService.disable($rootScope.service.username, $scope.settings).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
            }
        });
    };
    watchNowPlayingSwitch();

    $scope.submitSettings = function (settings) {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.form.$invalid) {
            $alert({
                content: 'Please fill in all required fields correctly.',
                type: 'danger',
                duration: 10,
            });
            return;
        }
        $scope.submitting = true;
        NowPlayingTweetsService.submitSettings($rootScope.service.username, settings).then(function () {
            $scope.submitting = false;
            $alert({
                content: 'New settings saved.',
                type: 'success',
                duration: 5,
            });
        }, function () {
            $alert({
                content: 'Something went wrong while saving your settings. Your settings were not saved. Please try again.',
                type: 'danger',
                duration: 10,
            });
            $scope.submitting = false;
        });
    };

    $scope.removeSettings = function () {
        // Reset settings.
        $rootScope.service.nowPlayingTweets = { isEnabled: false };
        unregisterWatch();

        // Remove settings, server-side.
        $scope.submitting = true;
        NowPlayingTweetsService.removeSettings($rootScope.service.username).then(function () {
            $scope.submitting = false;
            $scope.nowPlayingState = false;
            initialiseSettings();
            watchNowPlayingSwitch();
            $alert({
                content: 'Your #NowPlaying settings have been removed.',
                type: 'success',
                duration: 5,
            });
        }, function () {
            $alert({
                content: 'Something went wrong while removing your settings. Your settings were not saved. Please try again.',
                type: 'danger',
                duration: 10,
            });
            watchNowPlayingSwitch();
            $scope.submitting = false;
        });
    };
});
