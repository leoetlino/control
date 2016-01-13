/* global angular, inject */

describe("FeedbackService", function () {

  beforeEach(angular.mock.module("control"));
  beforeEach(angular.mock.module(function ($provide) {
    $provide.value("ENV", { apiEndpoint: "itframe.innovatete.ch" });
  }));
  beforeEach(inject(function (FeedbackService, $httpBackend) {
    this.service = FeedbackService;
    this.$httpBackend = $httpBackend;
  }));

  describe("the service", function () {
    it("should provide a send method", function () {
      expect(this.service.send).toEqual(jasmine.any(Function));
    });
  });

  describe("the send() method", function () {

    it("should succeed if everything is OK", function () {
      var succeeded = false;

      var title = "dummy";
      var message = "dummy message";

      this.$httpBackend.expectPOST("https://itframe.innovatete.ch/control/feedback", {
        subject: title,
        message: message,
      }).respond(200, { result: "success" });

      this.service.send(title, message).then(function () {
        succeeded = true;
      });

      this.$httpBackend.flush();
      expect(succeeded).toBe(true);
    });

    it("should fail if the server failed", function () {
      var succeeded = false;

      var title = "dummy";
      var message = "dummy message";

      this.$httpBackend.expectPOST("https://itframe.innovatete.ch/control/feedback", {
        subject: title,
        message: message,
      }).respond(500, { result: "error" });

      this.service.send(title, message).then(function () {
        succeeded = true;
      });

      this.$httpBackend.flush();
      expect(succeeded).not.toBe(true);
    });

  });

});
