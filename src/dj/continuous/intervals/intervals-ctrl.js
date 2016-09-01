import { lodash as _, angular, moment } from "../../../vendor";

export default /*@ngInject*/ function ($scope) {
  this.now = new Date();

  $scope.moment = moment;
  this.intervals = [{ // dummy data
    "username": "opencast",
    "name": "passion",
    "songs": [
      "565094428a32bdab10188b0e",
      "5650d3838a32bdab10198dc2",
      "5650d3bc8a32bdab10198e9e",
      "5650d3ec8a32bdab10198f59",
    ],
    "intervalType": "random",
    "every": 2,
    "intervalMode": "songs",
    "songsAtOnce": 1,
    "start": "2015-11-21T19:42:48.457Z",
    "end": "2015-11-21T19:42:48.457Z",
    "forever": true,
  }];

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
  };

  this.beforeSave = () => {
    this.disableForm = true;
  };

  this.save = () => {
    this.disableForm = false;
    // some saving stuff
  };

  let _intervals;
  this.onEdit = () => {
    _intervals = angular.copy(this.intervals);
  };
  this.onCancel = () => {
    this.intervals = angular.copy(_intervals);
  };

}
