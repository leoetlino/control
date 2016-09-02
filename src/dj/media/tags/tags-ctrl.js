import { lodash as _, angular } from "../../../vendor";

export default /*@ngInject*/ function () {
  this.now = new Date();

  this.tags = [{
    name: "testing",
    color: "#ff01b8",
  }, {
    name: "testing",
    color: "#ffb1b1",
  }, {
    name: "testing",
    color: "#ddb1ff",
  }];

  this.isSaving = false;

  // form functions

  this.addTag = () => {
    this.tags.push({
      "name": "",
      "color": "#FFFFFF",
    });
  };

  this.removeTag = (tag) => {
    this.tags = _.without(this.tags, tag);
  };

  this.beforeSave = () => {
    this.disableForm = true;
  };

  this.save = () => {
    this.disableForm = false;
    // some saving stuff
  };

  let _tags;
  this.onEdit = () => {
    _tags = angular.copy(this.tags);
  };
  this.onCancel = () => {
    this.tags = angular.copy(_tags);
  };

  // color stuff
  this.getFontColor = (backgroundColour, threshold = 128) => {
    let r;
    let g;
    let b;
    let yiq;
    try {
      r = parseInt(backgroundColour.slice(1).substr(0, 2), 16);
      g = parseInt(backgroundColour.slice(1).substr(2, 2), 16);
      b = parseInt(backgroundColour.slice(1).substr(4, 2), 16);
      yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

      return (yiq >= threshold) ? "#333333" : "#FFFFFF";
    } catch (e) {
      return "#FFFFFF";
    }
  };

}
