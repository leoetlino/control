import { angular } from './vendor';

export default /*@ngInject*/ function ($alertProvider) {
    angular.extend($alertProvider.defaults, {
        animation: 'am-fade-and-slide-top',
        placement: 'top',
    });
}
