// Based on https://github.com/mjt01/angular-feature-flags/blob/master/src/featureFlag.directive.js
// but patched to ignore an empty attribute value.
export default /*@ngInject*/ (featureFlags) => {
  return {
    transclude: "element",
    priority: 599,
    terminal: true,
    restrict: "A",
    compile: (tElement, tAttrs) => {
      let hasHideAttribute = "featureFlagHide" in tAttrs;
      tElement[0].textContent = " featureFlag: " + tAttrs.showIfFeatureFlag + " is " + (hasHideAttribute ? "on" : "off") + " ";
      return function featureFlagPostLink($scope, element, attrs, ctrl, $transclude) {
        let featureEl;
        let childScope;
        $scope.$watch(() => featureFlags.isOn($scope.$eval(attrs.showIfFeatureFlag)), function onChange(isEnabled) {
          var showElement = hasHideAttribute ? !isEnabled : isEnabled;
          if (showElement) {
            childScope = $scope.$new();
            $transclude(childScope, function (clone) {
              featureEl = clone;
              element.after(featureEl).remove();
            });
          } else {
            if (childScope) {
              childScope.$destroy();
              childScope = null;
            }
            if (featureEl) {
              featureEl.after(element).remove();
              featureEl = null;
            }
          }
        });
      };
    },
  };
};
