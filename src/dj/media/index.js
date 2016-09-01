import { angular } from "../../vendor";
import upload from "./upload";

export default angular.module("control.dj.media", [
  upload,
])
    .run(/*@ngInject*/ (DjManageService) => {
      DjManageService.addSection({
        name: "Media",
        id: "media",
      });
    })
    .name;
