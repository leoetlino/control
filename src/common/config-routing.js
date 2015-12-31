import { angular } from '../vendor';

export default /*@ngInject*/ function (
    $httpProvider,
    $locationProvider,
    $routeProvider,
    $routeSegmentProvider,
    $provide,
) {
    const app = angular.module('control');

    app.$httpProvider = $httpProvider;
    app.segments = $routeSegmentProvider.segments;
    $provide.factory('$routeSegmentProvider', () => $routeSegmentProvider);

    $routeSegmentProvider.options.strictMode = true;
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
    });
}
