import { lodash as _, angular, moment } from "../../../vendor";

export default /*@ngInject*/ function ($scope, IntervalsService) {
  let _intervals;
  let _removedIntervals = [];

  this.now = new Date();

  $scope.moment = moment;
  this.intervals = [];

  IntervalsService.getIntervals().then((intervals) => {
    this.intervals = intervals;
  });

  // convert dte string to date
  for (let interval of this.intervals) {
    interval.start = new Date(interval.start);
    interval.end = new Date(interval.end);
  }

  this.isSaving = false;


  this.intervalTypes = [
    { value: "random", text: "Random selection" },
    { value: "ordered", text: "Play in order" },
    { value: "all", text: "Play all songs of interval" },
  ];

  this.intervalModes = [
    { value: "songs", text: "songs" },
    { value: "seconds", text: "seconds" },
  ];

  // form functions

  this.addInterval = () => {
    this.intervals.push({
      "name": "",
      "songs": [],
      "intervalType": "random",
      "every": 1,
      "intervalMode": "songs",
      "songsAtOnce": 1,
      "start": new Date(),
      "end": new Date(),
      "forever": false,
    });
  };

  this.removeInterval = (interval) => {
    this.intervals = _.without(this.intervals, interval);
    _removedIntervals.push(interval);
  };

  this.beforeSave = () => {
    this.disableForm = true;
  };

  this.save = () => {
    _removedIntervals.forEach((interval) => {
      interval._id && IntervalsService.deleteInterval(interval._id);
    });
    this.intervals.forEach((interval) => {
      if (interval._id) {
        IntervalsService.updateInterval(interval._id, interval);
      } else {
        IntervalsService.addInterval(interval).then((data) => {
          interval._id = data._id;
        });
      }
    });
    this.disableForm = false;
  };

  this.onEdit = () => {
    _intervals = angular.copy(this.intervals);
    _removedIntervals = [];
  };
  this.onCancel = () => {
    this.intervals = angular.copy(_intervals);
    _removedIntervals = [];
  };

}
