export default /*@ngInject*/ function ClocksCtrl(ClocksService) {
  this.daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  this.hoursOfDay = [];
  this.clocks = [];
  for (let i = 0; i <= 23; i++) {
    this.hoursOfDay.push(i);
  }

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
}
