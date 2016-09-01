import { angular } from "../../../vendor";

import ClocksCtrl from "./clocks-ctrl";
import ClocksService from "./clocks-service";

export default angular.module("control.dj.continuous.clocks", [])
   .controller("ClocksCtrl", ClocksCtrl)
   .service("ClocksService", ClocksService)
    .run(/*@ngInject*/ (DjManageService) => {
      DjManageService.addItem({
        sectionId: "continious",
        name: "Clocks",
        icon: "clock-o",
        route: {
          subPathName: "clocks",
          name: "clocks",
          template: require("./clocks.html"),
          controller: "ClocksCtrl",
          controllerAs: "ctrl",
          title: "Clocks",
          resolve: /*@ngInject*/ {

          },
        },
      });
    })
    .name;
