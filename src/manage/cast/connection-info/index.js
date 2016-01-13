import { angular } from "../../../vendor";

import ConnectionInfoCtrl from "./connection-info-ctrl";

export default angular.module("control.manage.cast.connection-info", [])
    .controller("ConnectionInfoCtrl", ConnectionInfoCtrl)
    .run(/*@ngInject*/ (ManageService) => {
      ManageService.addItem({
        sectionId: "cast",
        name: "Connection Info",
        icon: "info",
        order: 2,
        route: {
          subPathName: "connection-info",
          name: "connectionInfo",
          template: require("./connection-info.html"),
          controller: "ConnectionInfoCtrl",
          controllerAs: "ctrl",
          title: "Connection Info",
          resolve: /*@ngInject*/ {
            config: (ConfigService) => ConfigService.getConfig(),
          },
        },
      });
    })
    .name;
