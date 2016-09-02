import { angular } from "../../../vendor";

import TunesCtrl from "./tunes-ctrl";
import "./tunes.css";

export default angular.module("control.dj.media.tunes", [])
    .controller("TunesCtrl", TunesCtrl)
    .run(/*@ngInject*/ (DjManageService) => {
      DjManageService.addItem({
        sectionId: "media",
        name: "Tunes",
        icon: "database",
        route: {
          subPathName: "tunes",
          name: "tunes",
          template: require("./tunes.html"),
          controller: "TunesCtrl",
          controllerAs: "ctrl",
          title: "Tunes",
          resolve: /*@ngInject*/ {

          },
        },
      });
    })
    .name;
