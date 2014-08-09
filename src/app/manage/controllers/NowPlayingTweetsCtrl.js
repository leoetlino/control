/* global define, window */
define(['control'], function (control) {
    'use strict';
    control.controller('NowPlayingTweetsCtrl', function ($scope, NowPlayingTweetsService, ENV, $routeParams, services, $location, flash) {

        var rejectRequest = function (message) {
            $scope.unauthorised = true;
            $location.path('/manage');
            flash.to('alert-general').error = message;
        };

        // Check whether the user is allowed to submit a request for the requested service
        var username = $routeParams.username,
            canRequest = false,
            i;

        for (i = 0; i < services.length; i++) {
            if (services[i].username === username) {
                $scope.service = services[i];
                canRequest = true;
                break;
            }
        }

        if (!canRequest) {
            rejectRequest('The service was not found.');
            return;
        }

        if ($scope.service.name === 'Free') {
            rejectRequest('Free servers are not eligible for #NowPlaying. Please consider upgrading!');
        }

        if (['Terminated', 'Suspended', 'Cancelled', 'Pending'].indexOf($scope.service.status) > -1) {
            rejectRequest('You can\'t manage #NowPlaying for server #' + $scope.service.id + ' as it is not active.');
        }

        if ($scope.service.group.toLowerCase().indexOf('cast') === -1) {
            rejectRequest('You can\'t manage #NowPlaying for server #' + $scope.service.id + ' as it is not a streaming server.');
        }

        // FIXME: This is currently hardcoded, but can be removed as soon as ITFrame returns the data structured exactly as the following object.
        $scope.service.nowPlaying = {
            isEnabled: true,
            settings: {
                username: $scope.service.username,
                token: 'token',
                secret: 'secret',
                prefix: '#NowPlaying',
                suffix: '',
                interval: 5,
                twitterHandle: 'itOPENcast'
            }
        };

        // Initialisation
        var reset, initialiseSettings;
        $scope.reset = initialiseSettings = reset = function () {
            $scope.nowPlayingState = $scope.service.nowPlaying.isEnabled;
            $scope.settings = {};
            $scope.settings.prefix = $scope.service.nowPlaying.settings.prefix || '#NowPlaying';
            $scope.settings.suffix = $scope.service.nowPlaying.settings.suffix || '';
            $scope.settings.interval = $scope.service.nowPlaying.settings.interval || 1;
            $scope.settings.token = $scope.service.nowPlaying.settings.token;
            $scope.settings.secret = $scope.service.nowPlaying.settings.secret;
            $scope.settings.twitterHandle = $scope.service.nowPlaying.settings.twitterHandle || 'signinwithtwitterfirst';
        };
        initialiseSettings();

        $scope.submitted = $scope.submitting = false;

        // Functions
        var changeStateSuccess = function () {
            $scope.submitted = true;
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
                $scope.submitted = false;
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
            $scope.submitted = false;
            NowPlayingTweetsService.submitSettings($scope.service.username, settings).then(function () {
                $scope.submitted = true;
                $scope.submitting = false;
            }, function () {
                flash.to('alert-now-playing-box').error = 'Something went wrong while submitting your settings. Your settings were not saved. Please try again.';
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
