control.run(function ($rootScope, $location, $window, $alert, AUTH_EVENTS, ServicesService, Session) {
    function initServices () {
        // returns a promise.
        return ServicesService.initAndGetService().then(function (service) {
            $rootScope.servicesLoaded = true;
            $rootScope.services = ServicesService.getServicesList();
            $rootScope.service = service;
            return service;
        });
    }

    $rootScope.$on(AUTH_EVENTS.loginSuccess, initServices);
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
        ServicesService.invalidateCache();
        return initServices().then(function onSuccess () {
            $location.path('/');
        }, function onFail () {
            $location.path('/');
            $window.location.reload();
        });
    });
    $rootScope.$on(AUTH_EVENTS.loginFailed, function() {
        $alert({
            content: 'Couldn\'t log in. Please check your credentials. If you forgot your password, you can reset it from the client area.',
            type: 'danger',
            duration: 10
        });
    });
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
        ServicesService.invalidateCache();
        $rootScope.services = null;
        $rootScope.service = null;

        $location.path('/log-in');
        $alert({
            content: 'You have been logged out.',
            type: 'success',
            duration: 5
        });
    });
    $rootScope.$on(AUTH_EVENTS.logoutFailed, function() {
        $alert({
            content: 'Couldn\'t log you out. Please try again. If the problem persists, reload the page and contact us.',
            type: 'danger',
            duration: 10
        });
    });
    $rootScope.$on(AUTH_EVENTS.badRequest, function() {
        $alert({
            content: 'Something went wrong. Please try again. If the problem persists, reload the page and contact us.',
            type: 'danger',
            duration: 10
        });
    });
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
        Session.destroy();
        $location.path('/log-in');
        $alert({
            content: 'Your session has expired, so you have been logged out.',
            type: 'warning'
        });
    });
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
        $location.path('/log-in');
        $alert({
            content: 'Please log in to continue.',
            type: 'warning',
            duration: 5
        });
    });
    $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
        $location.path('/log-in');
        $alert({
            title: 'Access denied.',
            content: 'You are not authorised to do this.',
            type: 'warning',
            duration: 5
        });
    });
});
