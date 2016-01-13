import { angular } from "../vendor";
import FeedbackCtrl from "./feedback-ctrl";
import FeedbackService from "./feedback-service";

export default angular.module("control.feedback", [])
    .service("FeedbackService", FeedbackService)
    .controller("FeedbackCtrl", FeedbackCtrl)
    .run(/*@ngInject*/ function ($routeSegmentProvider, USER_ROLES) {
      $routeSegmentProvider
            .when("/feedback", "feedback")
            .segment("feedback", {
              template: require("./feedback.html"),
              authorizedRoles: [USER_ROLES.all],
              title: "Send your feedback",
              controller: "FeedbackCtrl",
            });
    })
    .name;
