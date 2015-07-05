/* global define */
define(['control'], function (control) {
    'use strict';
    control.controller('NowPlayingTweetsCtrl', function ($rootScope, $scope, NowPlayingTweetsService, ENV, $routeParams, $location, flash) {

        // Initialisation
        var initialiseSettings = function () {
            $scope.nowPlayingState = $rootScope.service.nowPlaying.isEnabled;
            $scope.settings = {};
            $rootScope.service.nowPlaying.settings = $rootScope.service.nowPlaying.settings || {};
            $scope.settings.prefix = $rootScope.service.nowPlaying.settings.prefix || '#NowPlaying';
            $scope.settings.suffix = $rootScope.service.nowPlaying.settings.suffix || '';
            $scope.settings.interval = $rootScope.service.nowPlaying.settings.interval || 5;
            $scope.settings.consumerKey = $rootScope.service.nowPlaying.settings.consumerKey;
            $scope.settings.consumerSecret = $rootScope.service.nowPlaying.settings.consumerSecret;
            $scope.settings.accessToken = $rootScope.service.nowPlaying.settings.accessToken;
            $scope.settings.accessTokenSecret = $rootScope.service.nowPlaying.settings.accessTokenSecret;
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
                    NowPlayingTweetsService.enable($rootScope.service.username).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
                } else {
                    NowPlayingTweetsService.disable($rootScope.service.username).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
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
            NowPlayingTweetsService.submitSettings($rootScope.service.username, settings).then(function () {
                $scope.submitting = false;
                flash.to('alert-now-playing-box').success = 'Your new settings have been saved.';
            }, function () {
                flash.to('alert-now-playing-box').error = 'Something went wrong while submitting your settings. Your settings were not saved. Please try again.';
                $scope.submitting = false;
            });
        };

        $scope.removeSettings = function () {
            // Reset settings.
            $rootScope.service.nowPlaying.settings = {};
            unregisterWatch();
            initialiseSettings();

            // Remove settings, server-side.
            $scope.submitting = true;
            NowPlayingTweetsService.removeSettings($rootScope.service.username).then(function () {
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
    });
});
