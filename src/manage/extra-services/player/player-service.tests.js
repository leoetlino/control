/* global angular, inject */

describe("PlayerService", function () {

  beforeEach(angular.mock.module("control"));
  beforeEach(angular.mock.module(function ($provide) {
    $provide.value("ENV", { apiEndpoint: API_ENDPOINT });
  }));
  beforeEach(inject(function (TuneInIntegrationService, $httpBackend) {
    this.service = TuneInIntegrationService;
    this.$httpBackend = $httpBackend;
  }));

  describe("the service", function () {

    it("should provide a getSettings method", function () {
      expect(this.service.getSettings).toEqual(jasmine.any(Function));
    });

    it("should provide a saveSettings method", function () {
      expect(this.service.saveSettings).toEqual(jasmine.any(Function));
    });

    it("should provide a removeSettings method", function () {
      expect(this.service.removeSettings).toEqual(jasmine.any(Function));
    });
  });

});
