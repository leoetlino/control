angular.module('control.manage.extra-services').controller('TuneInIntegrationCtrl', function ($rootScope, $scope, TuneInIntegrationService, ENV, $routeParams, $location, $alert) {

    // Initialisation
    var initialiseSettings = function () {
        $scope.settings = $rootScope.service.tuneinIntegration;
        if (typeof $scope.settings === 'undefined') {
            $scope.disableForm = true;
            $scope.notSupportedByServer = true;
            return;
        }
        $scope.integrationEnabled = $scope.settings.isEnabled;
    };

    $rootScope.$watch('service.tuneinIntegration', function (newValue) {
        $scope.settings = newValue;
        $scope.integrationEnabled = $scope.settings.isEnabled;
    });

    $scope.disableForm = false;
    initialiseSettings();

    // Functions
    var changeStateSuccess = function () {
        $scope.disableForm = false;
    };

    var changeStateFailure = function (oldValue) {
        $alert({
            content: 'Something went wrong while enabling or disabling the TuneIn integration. Please try again.',
            type: 'error',
            duration: 10
        });
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

                $scope.$broadcast('show-errors-check-validity');
                if ($scope.form.$invalid) {
                    $alert({
                        content: 'The integration has not yet been configured correctly.',
                        type: 'error',
                        duration: 10
                    });
                    return;
                }

                $scope.disableForm = true;
                $scope.settings.isEnabled = $scope.integrationEnabled;
                if ($scope.integrationEnabled) {
                    TuneInIntegrationService.enable($rootScope.service.username).then(changeStateSuccess, function () { changeStateFailure(oldValue); });
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
            $alert({
                content: 'New settings saved.',
                type: 'success',
                duration: 5
            });
        }, function () {
            $alert({
                content: 'Something went wrong while saving your settings. Your settings were not saved. Please try again.',
                type: 'error',
                duration: 10
            });
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
            $scope.integrationEnabled = false;
            watchTuneInIntegrationSwitch();
            $alert({
                content: 'Your TuneIn integration settings have been removed.',
                type: 'success',
                duration: 5
            });
        }, function () {
            $alert({
                content: 'Something went wrong while removing your settings. Your settings were not removed. Please try again.',
                type: 'error',
                duration: 10
            });
            watchTuneInIntegrationSwitch();
            $scope.disableForm = false;
        });
    };

});
