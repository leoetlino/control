import { angular } from "../../../vendor";

import StreamsCtrl from "./streams-ctrl";

export default angular.module("control.manage.cast.streams", [])
    .controller("StreamsCtrl", StreamsCtrl)
    .run(/*@ngInject*/ function (ManageService) {
      ManageService.addItem({
        sectionId: "cast",
        name: "Streams",
        icon: "music",
        order: 1,
        route: {
          subPathName: "streams",
          name: "streams",
          template: require("./streams.html"),
          controller: "StreamsCtrl",
          controllerAs: "ctrl",
          title: "Streams",
          resolve: /*@ngInject*/ {
            config: (ConfigService) => ConfigService.getConfig(),
          },
        },
      });
    })
    .name;
