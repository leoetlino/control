angular.module('templates-ngBootstrapTemplates', ['template/tabs/tabset.html']);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "<div class=row><div ng-class=\"{'col-sm-4': vertical}\"><ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul></div><div ng-class=\"{'col-sm-8': vertical}\"><div class=tab-content><div class=tab-pane ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.active}\" tab-content-transclude=tab></div></div></div></div>");
}]);
