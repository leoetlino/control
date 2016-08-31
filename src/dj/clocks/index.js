import { angular } from "../../vendor";

import ClocksCtrl from "./clocks-ctrl";

export default angular.module("control.dj.clocks", [])
    .controller("ClocksCtrl", ClocksCtrl)
    .run(/*@ngInject*/ (DjManageService) => {
      DjManageService.addItem({
        name: "Clocks",
        icon: "link",
        route: {
          subPathName: "clocks",
          name: "clocks",
          template: require("./clocks.html"),
          controller: "ClocksCtrl",
          controllerAs: "ctrl",
          title: "Clocks",
        },
      });
    })
    .name;
