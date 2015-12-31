import { angular } from '../../../vendor';

export default /*@ngInject*/ function (config) {
    this.config = angular.copy(config);
}
