import { angular } from "../../../vendor";

import TagsCtrl from "./tags-ctrl";
import TagsService from "./tags-service";

export default angular.module("control.dj.media.tags", [])
    .controller("TagsCtrl", TagsCtrl)
    .service("TagsService", TagsService)
    .run(/*@ngInject*/ (DjManageService) => {
      DjManageService.addItem({
        sectionId: "media",
        name: "Tags",
        icon: "tags",
        route: {
          subPathName: "tags",
          name: "tags",
          template: require("./tags.html"),
          controller: "TagsCtrl",
          controllerAs: "ctrl",
          title: "Tags",
          resolve: /*@ngInject*/ {

          },
        },
      });
    })
    .name;
