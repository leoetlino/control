angular.module('control.manage.extra-services').controller('TuneInIntegrationCtrl', function ($rootScope, $scope, TuneInIntegrationService, ENV, $routeParams, $location, $alert) {

    // Initialisation
    var initialiseSettings = function () {
        $scope.settings = $rootScope.service.tuneInIntegration;
        if (typeof $scope.settings === 'undefined') {
            $scope.disableForm = true;
            $scope.notSupportedByServer = true;
            return;
        }
        $scope.integrationEnabled = $scope.settings.isEnabled;
    };

    $scope.$watch('service.tuneInIntegration', function (newValue) {
        $scope.settings = newValue;
        $scope.integrationEnabled = $scope.settings.isEnabled;
    });

    $scope.disableForm = false;
    initialiseSettings();

    // Functions
    var changeStateSuccess = function () {
        $scope.disableForm = false;
    };

    var changeStateFailure = function (oldValue, error) {
        $alert({
            content: 'Failed to enable/disable the TuneIn integration (' + error + '). Please try again.',
            type: 'danger',
            duration: 10,
        });
        unregisterWatch();
        $scope.integrationEnabled = oldValue;
        watchTuneInIntegrationSwitch();
        $scope.disableForm = false;
    };

    var unregisterWatch;
    var watchTuneInIntegrationSwitch = function () {
        unregisterWatch = $scope.$watch('integrationEnabled', function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }

            $scope.$broadcast('show-errors-check-validity');
            if ($scope.form.$invalid) {
                $alert({
                    content: 'The integration has not been configured.',
                    type: 'warning',
                    duration: 10,
                });
                return;
            }

            $scope.disableForm = true;
            $scope.settings.isEnabled = $scope.integrationEnabled;
            if ($scope.integrationEnabled) {
                TuneInIntegrationService.enable($rootScope.service.username, $scope.settings).then(changeStateSuccess, function (res) { changeStateFailure(oldValue, res.data.error); });
            } else {
                TuneInIntegrationService.disable($rootScope.service.username, $scope.settings).then(changeStateSuccess, function (res) { changeStateFailure(oldValue, res.data.error); });
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
            $alert({
                content: 'New settings saved.',
                type: 'success',
                duration: 5,
            });
        }, function (res) {
            $alert({
                content: 'Could not save your settings (' + res.data.error + '). Your settings were not saved. Please try again.',
                type: 'danger',
                duration: 10,
            });
            $scope.disableForm = false;
            $scope.reloadServices();
        });
    };

    $scope.removeSettings = function () {
        // Reset settings.
        $rootScope.service.tuneInIntegration = { isEnabled: false };
        unregisterWatch();
        initialiseSettings();

        // Remove settings, server-side.
        $scope.disableForm = true;
        TuneInIntegrationService.removeSettings($rootScope.service.username).then(function () {
            $scope.disableForm = false;
            $scope.integrationEnabled = false;
            watchTuneInIntegrationSwitch();
            $alert({
                content: 'Your TuneIn integration settings have been removed.',
                type: 'success',
                duration: 5,
            });
        }, function (res) {
            $alert({
                content: 'Could not remove your settings (' + res.data.error + '). Your settings were not removed. Please try again.',
                type: 'danger',
                duration: 10,
            });
            watchTuneInIntegrationSwitch();
            $scope.disableForm = false;
        });
    };

});
