import { angular, lodash as _ } from "../../../vendor";

export default /*@ngInject*/ function ClocksCtrl(ClocksService, ClocksColorService, TagsService, $modal, $scope) {
  this.daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  this.daysOfWeekSelect = [
      { "value": 1, "label": "Monday" },
      { "value": 2, "label": "Tuesday" },
      { "value": 3, "label": "Wednesday" },
      { "value": 4, "label": "Thursday" },
      { "value": 5, "label": "Friday" },
      { "value": 6, "label": "Saturday" },
      { "value": 7, "label": "Sunday" },
  ];
  this.hoursOfDay = [];
  this.clocks = [];
  this.tags = [];
  this.saving = false;

  for (let i = 0; i <= 23; i++) {
    this.hoursOfDay.push(i);
  }
  this.ClocksColorService = ClocksColorService; // forward to the view


  this.loadClocks = () => {
    return ClocksService.getClocks().then((clocks) => {
      this.clocks = clocks;
      this.originalClocks = angular.copy(clocks);
    });
  };

  TagsService.getTags().then((tags) => {
    this.tags = tags;
  });

  this.getClockForTime = (day, hour) => {
    for (let id in this.clocks) {
      if (this.clocks.hasOwnProperty(id)) {
        if ((this.clocks[id].start.dayOfWeek <= day && this.clocks[id].end.dayOfWeek >= day) && (this.clocks[id].start.hour <= hour && this.clocks[id].end.hour >= hour)) {
          return this.clocks[id];
        }
      }
    }
    return false;
  };

  this.getTagForId = (_id) => {
    return _. filter(this.tags, { _id })[0];
  };

  this.addClock = () => {
    this.newClock = {
      name: "",
      color: "#FFFFFF",
      tags: [],
      tagTime: [100],
      start: {
        dayOfWeek: 1,
        hour: 0,
        minute: 0,
      },
      end: {
        dayOfWeek: 7,
        hour: 23,
        minute: 59,
      },
    };
    $modal({ scope: $scope, template: require("./add-clock.html"), show: true });
  };

  this.pushClock = (clock) => {
    // validation


    // set correct data model
    const tags = angular.copy(clock.tags);
    const tagTime = angular.copy(clock.tagTime);
    delete clock.tagTime;
    clock.tags = [];
    for (let i = 0; i < tags.length; i++) {
      clock.tags.push({
        percent: tagTime[i],
        tag: tags[i]._id,
      });
    }

    // push clock
    this.clocks.push(clock);
    return true;
  };

  this.canBeSaved = () => {
    let canBeSaved = true;
    // validation stuff
    if (this.clocks.length === 0) {
      canBeSaved = false;
    }

    if (this.saving) {
      canBeSaved = false;
    }
    // check on changes
    if (this.originalClocks.toString() === this.clocks.toString()) {
      canBeSaved = false;
    }
    return canBeSaved;
  };

  this.save = () => {
    this.saving = true;
    ClocksService.setClocks(this.clocks).then(() => {
      this.loadClocks().then(() => {
        this.saving = false;
      });
    });
  };
}
