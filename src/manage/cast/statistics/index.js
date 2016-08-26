import "./statistics.css";
import "flag-icon-css/css/flag-icon.css";
import "angular-tooltips";
import "angular-tooltips/dist/angular-tooltips.min.css";

import { angular } from "../../../vendor";

import StatisticsService from "./statistics-service";
import StatisticsCtrl from "./statistics-ctrl";

export default angular.module("control.manage.cast.stats", ["720kb.tooltips"])
    .service("StatisticsService", StatisticsService)
    .controller("StatisticsCtrl", StatisticsCtrl)
    .run(/*@ngInject*/ (ManageService) => {
      ManageService.addItem({
        sectionId: "cast",
        name: "Statistics",
        icon: "pie-chart",
        order: 5,
        route: {
          subPathName: "statistics",
          name: "statistics",
          template: require("./statistics.html"),
          controller: "StatisticsCtrl",
          controllerAs: "ctrl",
          title: "Statistics",
          resolve: /*@ngInject*/ {
            config: (ConfigService) => ConfigService.getConfig(),
          },
        },
      });
    })
    .name;
