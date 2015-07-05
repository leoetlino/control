/* global define */
define(['control'], function (control) {
    'use strict';
    control.controller('TuneInIntegrationCtrl', function ($rootScope, $scope, TuneInIntegrationService, ENV, $routeParams, $location, flash) {

        // Initialisation
        var initialiseSettings = function () {
            $scope.settings = $rootScope.service.tuneinIntegration;
            if (typeof $scope.settings === 'undefined') {
                $scope.disableForm = true;
                $scope.notSupportedByServer = true;
                return;
            }
        };

        $scope.disableForm = false;
        initialiseSettings();

        // Functions
        var changeStateSuccess = function () {
            $scope.reloadServices();
            $scope.disableForm = false;
        };

        var changeStateFailure = function (oldValue) {
            flash.to('alert-tunein-integration').error = 'Something went wrong while enabling or disabling the TuneIn integration. Please try again.';
            unregisterWatch();
            $scope.reloadServices();
            $scope.settings.isEnabled = oldValue;
            watchTuneInIntegrationSwitch();
            $scope.disableForm = false;
        };

        var unregisterWatch,
            watchTuneInIntegrationSwitch = function () {
                unregisterWatch = $scope.$watch('integrationEnabled', function (newValue, oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    $scope.$broadcast('show-errors-check-validity');
                    if ($scope.form.$invalid) {
                        flash.to('alert-tunein-integration').error = 'The integration has not yet been configured correctly.';
                        return;
                    }

                    $scope.disableForm = true;
                    if ($scope.settings.isEnabled) {
                        TuneInIntegrationService.saveSettings($rootScope.service.username, $scope.settings).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
                    } else {
                        TuneInIntegrationService.disable($rootScope.service.username).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
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
            TuneInIntegrationService.saveSettings($rootScope.service.username, settings).then(function () {
                $scope.disableForm = false;
                $scope.reloadServices();
                flash.to('alert-tunein-integration').success = 'Your new settings have been saved.';
            }, function () {
                flash.to('alert-tunein-integration').error = 'Something went wrong while disabling your settings. Your settings were not saved. Please try again.';
                $scope.disableForm = false;
                $scope.reloadServices();
            });
        };

        $scope.removeSettings = function () {
            // Reset settings.
            $rootScope.service.tuneinIntegration = { isEnabled: false };
            unregisterWatch();
            initialiseSettings();

            // Remove settings, server-side.
            $scope.disableForm = true;
            TuneInIntegrationService.removeSettings($rootScope.service.username).then(function () {
                $scope.disableForm = false;
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
