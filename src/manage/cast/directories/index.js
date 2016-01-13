import { angular } from "../../../vendor";

import DirectoriesService from "./directories-service";
import DirectoriesCtrl from "./directories-ctrl";

export default angular.module("control.manage.cast.directories", [])
    .service("DirectoriesService", DirectoriesService)
    .controller("DirectoriesCtrl", DirectoriesCtrl)
    .run(/*@ngInject*/ (ManageService) => {
      ManageService.addItem({
        sectionId: "cast",
        name: "Directories",
        icon: "th-list",
        order: 4,
        route: {
          subPathName: "directories",
          name: "directories",
          template: require("./directories.html"),
          controller: "DirectoriesCtrl",
          controllerAs: "ctrl",
          title: "Directories",
          resolve: /*@ngInject*/ {
            config: (ConfigService) => ConfigService.getConfig(),
            choices: ["DirectoriesService", (DirService) => DirService.getChoices()],
          },
        },
      });
    })
    .name;
