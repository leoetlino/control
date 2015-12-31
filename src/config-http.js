export default /*@ngInject*/ function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $httpProvider.interceptors.push('HttpTimeoutInterceptor');
    $httpProvider.interceptors.push('ServerErrorInterceptor');
}
