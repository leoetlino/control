import { angular } from "../../vendor";
import upload from "./upload";
import tags from "./tags";

export default angular.module("control.dj.media", [
  upload,
  tags,
])
    .run(/*@ngInject*/ (DjManageService) => {
      DjManageService.addSection({
        name: "Media",
        id: "media",
      });
    })
    .name;
