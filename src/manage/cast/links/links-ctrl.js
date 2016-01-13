import { lodash as _, angular } from "../../../vendor";

export default /*@ngInject*/ function (config) {
  this.config = angular.copy(config);
  this.primaryStream = _.findWhere(config.streams, { primary: true }).stream;
}
