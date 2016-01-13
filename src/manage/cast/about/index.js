import { angular } from "../../../vendor";

import AboutService from "./about-service";
import AboutCtrl from "./about-ctrl";

export default angular.module("control.manage.cast.about", [])
    .service("AboutService", AboutService)
    .controller("AboutCtrl", AboutCtrl)
    .run(/*@ngInject*/ (ManageService) => {
      ManageService.addItem({
        sectionId: "cast",
        name: "About",
        icon: "info-circle",
        order: 60,
        route: {
          subPathName: "about",
          name: "about",
          template: require("./about.html"),
          controller: "AboutCtrl",
          controllerAs: "ctrl",
          title: "About Cast",
          resolve: /*@ngInject*/ {
            config: (ConfigService) => ConfigService.getConfig(),
          },
        },
      });
    })
    .name;
