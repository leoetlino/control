export default function () {
  return function (scope, element, attr) {
    attr.$observe("link", function (linkHref) {
      element.text(linkHref.replace(/^https?:\/\//, ""));
      element.prop("href", linkHref.replace(/^http:\/\//, "https://"));
    });
  };
}
