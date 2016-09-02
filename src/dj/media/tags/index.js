import { angular } from "../../../vendor";

import TagsCtrl from "./tags-ctrl";

export default angular.module("control.dj.media.tags", [])
    .controller("TagsCtrl", TagsCtrl)
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
