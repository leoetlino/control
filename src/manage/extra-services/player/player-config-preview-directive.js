export default /*@ngInject*/ function playerConfigPreview ($timeout) {
  return (scope, element, attr) => {
    scope.$watch(attr.config, (newValue) => {
      element[0].contentWindow
                .postMessage({ type: "reloadConfig", config: newValue }, "https://player.shoutca.st");
    }, true);
    scope.$watch(attr.playerSrc, (newValue) => {
      element.attr("src", newValue);
    });
    element.on("load", () => {
      $timeout(() => {
        element[0].contentWindow
                    .postMessage({ type: "reloadConfig", config: scope[attr.config] }, "https://player.shoutca.st");
      }, 100);
    });
  };
}
