import { lodash as _ } from "../vendor";

export default /*@ngInject*/ function ($scope, $rootScope, AUTH_EVENTS, AuthService, localStorageService, $alert) {
  $scope.credentials = {
    email: "",
    password: "",
  };
  $scope.isLoading = false;
  $scope.logIn = function (credentials) {
    $scope.isLoading = true;
    AuthService.logIn(credentials).then(_.noop, function () {
      $scope.isLoading = false;
    });
  };

  $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
    $scope.isLoading = false;
  });

  (function showHelpForLoggingIn () {
    if (localStorageService.get("showed-login-help")) {
      return;
    }
    $alert({
      content: "It looks like it is the first time you're here! You can log in with your client area credentials.",
      type: "info",
      duration: 10,
    });
    localStorageService.set("showed-login-help", true);
  }());

}
