/* global angular, inject */

describe("link directive", function () {

  var compiledElement;
  var template = '<p><a link="http://example.com"></a></p>';

  beforeEach(angular.mock.module("control"));
  beforeEach(inject(function ($rootScope, $compile) {
    this.scope = $rootScope.$new();
    compiledElement = $compile(template)(this.scope);
    this.scope.$digest();
  }));

  it("should remove the protocol from the label", function () {
    expect(compiledElement.children("a").text()).toBe("example.com");
  });

  it("should force HTTPS on the href attribute", function () {
    expect(compiledElement.children("a").attr("href")).toBe("https://example.com");
  });
});
