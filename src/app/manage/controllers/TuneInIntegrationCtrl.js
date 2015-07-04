/* global define */
define(['control'], function (control) {
    'use strict';
    control.controller('TuneInIntegrationCtrl', function ($scope, TuneInIntegrationService, ENV, $routeParams, $location, flash) {

        // Initialisation
        var initialiseSettings = function () {
            $scope.settings = $scope.service.tuneinIntegration;
            if (typeof $scope.settings === 'undefined') {
                $scope.disableForm = true;
                $scope.notSupportedByServer = true;
                return;
            }
            $scope.integrationEnabled = $scope.settings.isEnabled || false;
        };

        $scope.disableForm = false;
        initialiseSettings();

        // Functions
        var changeStateSuccess = function () {
            $scope.disableForm = false;
        };

        var changeStateFailure = function (oldValue) {
            flash.to('alert-tunein-integration').error = 'Something went wrong while enabling or disabling the TuneIn integration. Please try again.';
            unregisterWatch();
            $scope.integrationEnabled = oldValue;
            watchTuneInIntegrationSwitch();
            $scope.disableForm = false;
        };

        var unregisterWatch,
            watchTuneInIntegrationSwitch = function () {
                unregisterWatch = $scope.$watch('integrationEnabled', function (newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    $scope.disableForm = true;
                    if ($scope.integrationEnabled) {
                        TuneInIntegrationService.enable($scope.service.username).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
                    } else {
                        TuneInIntegrationService.disable($scope.service.username).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
                    }
                });
            };
        watchTuneInIntegrationSwitch();

        $scope.saveSettings = function (settings) {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.form.$invalid) {
                return;
            }
            $scope.disableForm = true;
            TuneInIntegrationService.saSettings($scope.service.username, settings).then(function () {
                $scope.disableForm = false;
                flash.to('alert-now-playing-box').success = 'Your new settings have been saved.';
            }, function () {
                flash.to('alert-now-playing-box').error = 'Something went wrong while disableForm your settings. Your settings were not saved. Please try again.';
                $scope.disableForm = false;
            });
        };

        $scope.removeSettings = function () {
            // Reset settings.
            $scope.service.tuneinIntegration.settings = {};
            unregisterWatch();
            initialiseSettings();

            // Remove settings, server-side.
            $scope.disableForm = true;
            TuneInIntegrationService.removeSettings($scope.service.username).then(function () {
                $scope.disableForm = false;
                $scope.integrationEnabled = false;
                watchTuneInIntegrationSwitch();
                flash.to('alert-tunein-integration').success = 'Your TuneIn integration settings have been removed.';
            }, function () {
                flash.to('alert-tunein-integration').error = 'Something went wrong while removing your settings. Your settings were not removed. Please try again.';
                watchTuneInIntegrationSwitch();
                $scope.disableForm = false;
            });
        };

    });
});
