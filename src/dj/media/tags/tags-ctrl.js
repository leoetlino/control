import { lodash as _, angular } from "../../../vendor";

export default /*@ngInject*/ function (TagsService, $q) {
  this.now = new Date();

  this.tags = [];

  this.isSaving = false;

  // form functions

  this.addTag = () => {
    this.tags.push({
      "name": "",
      "color": "#FFFFFF",
    });
  };

  let _tags;
  let _deletedTags = [];
  this.onEdit = () => {
    _tags = angular.copy(this.tags);
    _deletedTags = [];
  };
  this.onCancel = () => {
    this.tags = angular.copy(_tags);
    _deletedTags = [];
  };

  this.removeTag = (tag) => {
    _deletedTags.push(angular.copy(tag));
    this.tags = _.without(this.tags, tag);
  };

  this.beforeSave = () => {
    this.disableForm = true;
  };

  this.save = () => {
    const promises = [];

    for (let tag of _deletedTags) {
      if (tag._id) {
        promises.push(TagsService.deteleTag(tag._id));
      }
    }
    for (let tag of this.tags) {
      if (!tag._id) {
        promises.push(TagsService.addTag(tag)).then((itframeTag) => {
          tag._id = itframeTag._id;
        });
      } else {
        promises.push(TagsService.updateTag(tag));
      }
    }
    $q.all(promises).then(()=> {
      this.disableForm = false;
    });
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

  this.getTags = () => {
    TagsService.getTags().then((tags) => {
      this.tags = tags;
    });
  };

  this.getTags();

}
