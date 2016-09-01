export default /*@ngInject*/ function ClocksCtrl() {
  this.daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  this.hoursOfDay = [];
  for (let i = 1; i <= 24; i++) {
    this.hoursOfDay.push(i);
  }
}
