/* global angular, inject */

describe("LoginCtrl", function () {

  beforeEach(angular.mock.module("control"));

  var scope;

  beforeEach(angular.mock.module(function ($provide) {
    $provide.factory("AuthService", function ($q) {
      return {
        logIn: function () {
          return $q(function (resolve) {
            resolve();
          });
        },
      };
    });
  }));

  beforeEach(inject(function ($rootScope, $controller, AuthService, AUTH_EVENTS) {
    scope = $rootScope.$new();
    $controller("LoginCtrl", { $rootScope: scope, $scope: scope });
    this.AuthService = AuthService;
    this.AUTH_EVENTS = AUTH_EVENTS;
  }));

  describe("the controller scope", function () {
    it("should provide a logIn method", function () {
      expect(scope.logIn).toEqual(jasmine.any(Function));
    });

    it("should set $scope.isLoading to false initially", function () {
      expect(scope.isLoading).toBe(false);
    });

    it("should set $scope.isLoading to false on login error", function () {
      scope.$broadcast(this.AUTH_EVENTS.loginFailed);
      expect(scope.isLoading).toBe(false);
    });

    describe("the logIn method", function () {
      it("should set $scope.isLoading to true", function () {
        scope.logIn({ email: "xxx", password: "xxx" });
        expect(scope.isLoading).toBe(true);
      });
      it("should call AuthService.logIn() to log in", function () {
        var credentials = { email: "xxx", password: "xxx" };
        spyOn(this.AuthService, "logIn").and.callThrough();
        scope.logIn(credentials);
        expect(this.AuthService.logIn).toHaveBeenCalledWith(credentials);
      });
    });
  });

});
