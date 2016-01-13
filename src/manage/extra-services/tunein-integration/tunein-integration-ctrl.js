import { angular } from "../../../vendor";

export default /*@ngInject*/ function ($rootScope, $scope, TuneInIntegrationService, ENV, $routeParams, $location, $alert, settings) {

    // Initialisation
  var initialiseSettings = function () {
    $scope.settings = angular.copy(settings);
    $scope.integrationEnabled = $scope.settings.isEnabled;
  };

  $scope.disableForm = false;
  initialiseSettings();

    // Functions
  var changeStateSuccess = function () {
    $scope.disableForm = false;
  };

  var changeStateFailure = function (oldValue, error) {
    $alert({
      content: "Failed to enable/disable the TuneIn integration (" + error + "). Please try again.",
      type: "danger",
      duration: 10,
    });
    unregisterWatch();
    $scope.integrationEnabled = oldValue;
    watchTuneInIntegrationSwitch();
    $scope.disableForm = false;
  };

  var unregisterWatch;
  var watchTuneInIntegrationSwitch = function () {
    unregisterWatch = $scope.$watch("integrationEnabled", function (newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }

      $scope.$broadcast("show-errors-check-validity");
      if ($scope.form.$invalid) {
        $alert({
          content: "The integration has not been configured.",
          type: "warning",
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

  $scope.saveSettings = function (newSettings) {
    $scope.$broadcast("show-errors-check-validity");
    if ($scope.form.$invalid) {
      return;
    }
    $scope.disableForm = true;
    TuneInIntegrationService.saveSettings($rootScope.service.username, newSettings).then(function () {
      $scope.disableForm = false;
      $alert({
        content: "New settings saved.",
        type: "success",
        duration: 5,
      });
    }, function (res) {
      $alert({
        content: "Could not save your settings (" + res.data.error + "). Your settings were not saved. Please try again.",
        type: "danger",
        duration: 10,
      });
      $scope.disableForm = false;
    });
  };

  $scope.removeSettings = function () {
        // Reset settings.
    $scope.settings = { isEnabled: false };
    $scope.integrationEnabled = false;
    unregisterWatch();

        // Remove settings, server-side.
    $scope.disableForm = true;
    TuneInIntegrationService.removeSettings($rootScope.service.username).then(function () {
      $scope.disableForm = false;
      $scope.integrationEnabled = false;
      watchTuneInIntegrationSwitch();
      $alert({
        content: "Your TuneIn integration settings have been removed.",
        type: "success",
        duration: 5,
      });
    }, function (res) {
      $alert({
        content: "Could not remove your settings (" + res.data.error + "). Your settings were not removed. Please try again.",
        type: "danger",
        duration: 10,
      });
      watchTuneInIntegrationSwitch();
      $scope.disableForm = false;
    });
  };

}
