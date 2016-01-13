/* global angular, inject */

describe("NavigationCtrl", function () {

  beforeEach(angular.mock.module("control"));
  beforeEach(angular.mock.module(function ($provide) {
    $provide.value("USER_ROLES", {
      all: "*",
      admin: "admin",
      user: "user",
      public: "public",
    });
  }));

  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller("NavigationCtrl", { $rootScope: scope, $scope: scope });
  }));

  describe("the controller scope", function () {
    it("should provide a isActive method", function () {
      expect(scope.isActive).toEqual(jasmine.any(Function));
    });

    it("should provide a logOut method", function () {
      expect(scope.logOut).toEqual(jasmine.any(Function));
    });

    it("should provide a reloadServices method", function () {
      expect(scope.reloadServices).toEqual(jasmine.any(Function));
    });

    describe("the reloadServices method", function () {
      it("should broadcast `invalidate-services-cache`", function () {
        spyOn(scope, "$broadcast");
        scope.reloadServices();
        expect(scope.$broadcast).toHaveBeenCalledWith("invalidate-services-cache");
      });
      it("should re-init the services immediately", function () {
        spyOn(scope, "initServices");
        scope.reloadServices();
        expect(scope.initServices).toHaveBeenCalled();
      });
    });

    describe("the player object", function () {
      it("should have a states object", function () {
        expect(scope.player.states).toEqual(jasmine.any(Object));
      });
      it('should have "stopped" as default state', function () {
        expect(scope.player.state).toBe(scope.player.states.stopped);
      });

      it("should have a toggle method", function () {
        expect(scope.player.toggle).toEqual(jasmine.any(Function));
      });
    });
  });

});
