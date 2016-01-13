import { angular } from "../../../vendor";

import AppRequestCtrl from "./app-request-ctrl";
import { appStatus, appStatusExplanation } from "./app-status-filter";
import AppStatusesService from "./app-statuses-service";
import appTabType from "./app-tab-type-filter";
import RequestAppCtrl from "./request-app-ctrl";
import RequestAppServiceFactory from "./request-app-service";

export default angular.module("control.manage.extra-services.apps", [])
.service("AppStatusesService", AppStatusesService)
.factory("RequestAppService", RequestAppServiceFactory)
.filter("appStatus", appStatus)
.filter("appStatusExplanation", appStatusExplanation)
.filter("appTabType", appTabType)
.controller("AppRequestCtrl", AppRequestCtrl)
.controller("RequestAppCtrl", RequestAppCtrl)
.run(/*@ngInject*/ (
    ManageService,
    $routeSegmentProvider,
    USER_ROLES,
) => {
  ManageService.addItem({
    sectionId: "extra-services",
    name: "Mobile Apps",
    icon: "mobile-phone",
    route: {
      subPathName: "apps",
      name: "requestApp",
      template: require("./request-app.html"),
      controller: "RequestAppCtrl",
      resolve: /*@ngInject*/ {
        apps: function (RequestAppService) {
          return RequestAppService.getAppsObject();
        },
      },
    },
  });

  $routeSegmentProvider
        .when("/manage/apps/view-request/:platform", "manage.apps")
        .within("manage")
        .segment("apps", {
          template: require("./view-app-request.html"),
          authorizedRoles: [USER_ROLES.all],
          title: "App Request",
          watcher: /*@ngInject*/ function ($rootScope) {
            if (!$rootScope.service) {
              return;
            }
            return $rootScope.service.id;
          },
          controller: "AppRequestCtrl",
          controllerAs: "ctrl",
          dependencies: ["platform"],
          resolve: /*@ngInject*/ {
            app: function (RequestAppService, $route, $alert, $location, $q) {
              var platform = $route.current.params.platform;
              if (["android", "iOS"].indexOf(platform) === -1) {
                $alert({
                  content: "The requested app platform does not exist.",
                  type: "danger",
                  duration: 5,
                });
                $location.path("/manage/apps").replace();
                return $q.reject();
              }

              return RequestAppService.getRequest(platform);
            },
          },
        });
})
.name;
