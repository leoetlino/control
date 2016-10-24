export default /*@ngInject*/ function ClocksCtrl(ClocksService, ClocksColorService, $modal, $scope) {
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
  for (let i = 0; i <= 23; i++) {
    this.hoursOfDay.push(i);
  }
  this.ClocksColorService = ClocksColorService; // forward to the view

  ClocksService.getClocks().then((clocks) => {
    this.clocks = clocks;
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

  this.addClock = () => {
    this.newClock = {
      name: "",
      color: "#FFFFFF",
      tags: [],
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
    // validation stuff
    this.clocks.push(clock);
    return true;
  };
}
