export default class AuthService {
    /*@ngInject*/
    constructor ($http, Session, USER_ROLES, localStorageService, ENV, AuthChecker, $rootScope, $interval, AUTH_EVENTS) {
      this.keepAlivePromise = null;
      this.logIn = function (credentials) {
        return $http
                .post(ENV.apiEndpoint + "/authenticate", credentials)
                .then(function (res) {
                  $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                  Session.create(res.data.token);
                }, function onFail () {
                  $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
      };

      this.logOut = function () {
        return $http
                .post(ENV.apiEndpoint + "/control/log-out")
                .then(function onLogoutSuccess () {
                  $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                  Session.destroy();
                }, function onLogoutFail () {
                  $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
                });
      };

      this.keepAlive = function () {
        $http.post(ENV.apiEndpoint + "/control/keep-alive")
                .then(function (res) {
                  Session.update(res.data.token);
                }, function (response) {
                  $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
                  $interval.cancel(AuthService.keepAlivePromise);
                  AuthService.keepAlivePromise = null;
                });
      };
      $rootScope.$on("sessionCreated", () => {
        if (this.keepAlivePromise) {
          return;
        }
        this.keepAlivePromise = $interval(this.keepAlive, 1000 * 60 * 15);
      });
      $rootScope.$on("sessionDestroyed", () => {
        if (!this.keepAlivePromise) {
          return;
        }
        $interval.cancel(this.keepAlivePromise);
        this.keepAlivePromise = null;
      });
    }
}
