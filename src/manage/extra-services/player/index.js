import { angular } from "../../../vendor";

import playerConfigPreview from "./player-config-preview-directive";
import PlayerCtrl from "./player-ctrl";
import PlayerServiceFactory from "./player-service";

export default angular.module("control.manage.extra-services.player", [])
    .factory("PlayerService", PlayerServiceFactory)
    .directive("playerConfigPreview", playerConfigPreview)
    .controller("PlayerCtrl", PlayerCtrl)
    .run(/*@ngInject*/ function (ManageService) {
      ManageService.addItem({
        sectionId: "extra-services",
        name: "Player",
        icon: "play",
        route: {
          subPathName: "player",
          name: "player",
          template: require("./player.html"),
          controller: "PlayerCtrl",
          title: "Player",
          resolve: /*@ngInject*/ {
            settings: (PlayerService, $q) => {
              return PlayerService.getSettings().then(
                            (settings) => $q.resolve(settings), () => $q.resolve());
            },
          },
        },
      });
    })
    .name;
