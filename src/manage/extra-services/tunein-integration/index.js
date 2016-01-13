import { angular } from "../../../vendor";

import TuneInIntegrationCtrl from "./tunein-integration-ctrl";
import TuneInIntegrationServiceFactory from "./tunein-integration-service";

export default angular.module("control.manage.extra-services.tunein", [])
    .factory("TuneInIntegrationService", TuneInIntegrationServiceFactory)
    .controller("TuneInIntegrationCtrl", TuneInIntegrationCtrl)
    .run(/*@ngInject*/ function (ManageService) {
      ManageService.addItem({
        sectionId: "extra-services",
        name: "TuneIn AIR Integration",
        icon: "headphones",
        route: {
          subPathName: "tunein-integration",
          name: "tuneinIntegration",
          template: require("./tunein-integration.html"),
          controller: "TuneInIntegrationCtrl",
          title: "TuneIn Integration",
          resolve: /*@ngInject*/ {
            settings: (TuneInIntegrationService, $q) => {
              return TuneInIntegrationService.getSettings().then(
                            settings => $q.resolve(settings), () => $q.resolve({}));
            },
          },
        },
      });
    })
    .name;
