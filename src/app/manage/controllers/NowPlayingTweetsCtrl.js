/* global define, window */
define(['control'], function (control) {
    'use strict';
    control.controller('NowPlayingTweetsCtrl', function ($scope, NowPlayingTweetsService, ENV, $routeParams, service, $location, flash) {

        $scope.service = service;

        // Initialisation
        var initialiseSettings = function () {
            $scope.nowPlayingState = $scope.service.nowPlaying.isEnabled;
            $scope.settings = {};
            $scope.service.nowPlaying.settings = $scope.service.nowPlaying.settings || {};
            $scope.settings.prefix = $scope.service.nowPlaying.settings.prefix || '#NowPlaying';
            $scope.settings.suffix = $scope.service.nowPlaying.settings.suffix || '';
            $scope.settings.interval = $scope.service.nowPlaying.settings.interval || 5;
            $scope.settings.token = $scope.service.nowPlaying.settings.token;
            $scope.settings.secret = $scope.service.nowPlaying.settings.secret;
            $scope.settings.twitterHandle = $scope.service.nowPlaying.settings.twitterHandle || 'signinwithtwitterfirst';
        };
        initialiseSettings();

        $scope.submitting = false;

        // Functions
        var changeStateSuccess = function () {
            $scope.submitting = false;
        };

        var changeStateFailure = function (oldValue) {
            flash.to('alert-now-playing-box').error = 'Something went wrong while enabling or disabling #NowPlaying. Please try again.';
            unregisterWatch();
            $scope.nowPlayingState = oldValue;
            watchNowPlayingSwitch();
            $scope.submitting = false;
        };

        var unregisterWatch,
            watchNowPlayingSwitch = function () {
            unregisterWatch = $scope.$watch('nowPlayingState', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }

                $scope.submitting = true;
                if ($scope.nowPlayingState) {
                    NowPlayingTweetsService.enable($scope.service.username).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
                } else {
                    NowPlayingTweetsService.disable($scope.service.username).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
                }
            });
        };
        watchNowPlayingSwitch();

        $scope.submitSettings = function (settings) {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.form.$invalid) {
                return;
            }
            $scope.submitting = true;
            NowPlayingTweetsService.submitSettings($scope.service.username, settings).then(function () {
                $scope.submitting = false;
                flash.to('alert-now-playing-box').success = 'Your new settings have been saved.';
            }, function () {
                flash.to('alert-now-playing-box').error = 'Something went wrong while submitting your settings. Your settings were not saved. Please try again.';
                $scope.submitting = false;
            });
        };

        $scope.removeSettings = function () {
            // Reset settings.
            $scope.service.nowPlaying.settings = {};
            unregisterWatch();
            initialiseSettings();

            // Remove settings, server-side.
            $scope.submitting = true;
            NowPlayingTweetsService.removeSettings($scope.service.username).then(function () {
                $scope.submitting = false;
                $scope.nowPlayingState = false;
                watchNowPlayingSwitch();
                flash.to('alert-now-playing-box').success = 'Your #NowPlaying settings have been removed.';
            }, function () {
                flash.to('alert-now-playing-box').error = 'Something went wrong while removing your settings. Your settings were not removed. Please try again.';
                watchNowPlayingSwitch();
                $scope.submitting = false;
            });
        };

        $scope.getTwitterCredentials = function () {
            $scope.triedGettingTwitterCredentials = true;
            window.$windowScope = $scope;
            window.open('/misc/twitter-oauth/get-credentials.php', '_blank', 'menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=no,personalbar=no,width=700,height=480');
        };
    });
});
