import { angular } from "../../vendor";
import ConfigService from "./config-service";
import castConnectionInfo from "./connection-info";
import castDirectories from "./directories";
import castGeoLock from "./geolock";
import castLinks from "./links";
import castStats from "./statistics";
import castStreams from "./streams";
import castAbout from "./about";

export default angular.module("control.manage.cast", [
  castConnectionInfo,
  castDirectories,
  castGeoLock,
  castLinks,
  castStats,
  castStreams,
  castAbout,
])
    .service("ConfigService", ConfigService)
    .run(/*@ngInject*/ (ManageService) => {
      ManageService.addSection({
        name: "Cast",
        id: "cast",
        visibleForCastOnly: true,
      });
    })
    .name;
