control.controller('NavigationCtrl', function ($scope, $location, $rootScope, $route, USER_ROLES, AUTH_EVENTS, AuthChecker, AuthService, Session, ServicesService, $window, $alert) {

    ////////////////////
    // Helper functions
    ////////////////////

    $scope.isActive = function (viewLocation) {
        return (viewLocation === '/') ? viewLocation === $location.path() : $location.path().indexOf(viewLocation) > -1;
    };

    $rootScope.reloadServices = function () {
        ServicesService.invalidateCache();
        return initServices();
    };

    $rootScope.$on('routeSegmentChange', function (index, route) {
        if (!route.segment) {
            return;
        }
        $rootScope.pageTitle = route.segment.params.title;
        if ($rootScope.service &&
            $rootScope.service.id &&
            route.segment.params.visibleForCastOnly &&
            $rootScope.service.group.toLowerCase().indexOf('nodes') === -1) {
            $rootScope.$broadcast('cast-only-route');
        }
    });

    ////////////
    // Services
    ////////////

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
    if (AuthChecker.isAuthenticated()) {
        initServices();
    }

    $rootScope.$watch('service.username', function (newUsername) {
        if (newUsername && $location.search().username && (newUsername !== $location.search().username)) {
            $location.search('username', null);
            $location.search('serviceId', null);
        }
    });

    $rootScope.$watch('service.id', function (newId, oldId) {
        if (newId && $location.search().serviceId && (newId !== $location.search().serviceId)) {
            $location.search('username', null);
            $location.search('serviceId', null);
        }
        if (oldId && newId !== oldId) {
            $rootScope.$broadcast('selected-service-changed');
        }
    });

    /////////////////////////
    // Authentication system
    /////////////////////////

    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthChecker.isAuthorized;
    $scope.isAuthenticated = AuthChecker.isAuthenticated;
    $scope.currentSession = Session;
    $scope.logOut = $scope.logout = function logOut () {
        AuthService.logOut().then(function () {
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
        });
    };

    var originalPath = null;
    $rootScope.$on('$routeChangeStart', function (event, next) {
        var segment = control.segments[next.$$route.segment];
        var authorizedRoles;
        if (segment) {
            authorizedRoles = segment.params.authorizedRoles;
        }
        if (!authorizedRoles) {
            authorizedRoles = [USER_ROLES.all];
        }

        if (!AuthChecker.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            if (AuthChecker.isAuthenticated()) {
                // user is not allowed
                if (next.originalPath !== '/log-in') {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    return;
                }
            } else {
                // user is not logged in
                if (next.originalPath !== '/log-in') {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    originalPath = next.originalPath;
                    return;
                }
            }
        }
    });

    $rootScope.$on('cast-only-route', function () {
        $alert({
            content: 'The page you are trying to access is only available for Cast nodes.',
            type: 'danger',
            duration: 5
        });
        $location.path('/manage/information');
    });

    $rootScope.$on('invalid-service', function () {
        $alert({
            content: 'The service does not exist.',
            type: 'danger',
            duration: 5
        });
        $location.search('username', null);
        $location.search('serviceId', null);
        $location.path('/');
    });

    $rootScope.$on('server-error', function onServerError (event, error) {
        $alert({
            content: error.message + ' (' + error.code + ')',
            type: 'danger',
            duration: error.alertDuration
        });
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
        if (originalPath === 'undefined' || !originalPath || originalPath === '/log-in') {
            originalPath = '/';
        }
        ServicesService.invalidateCache();
        return initServices().then(function onSuccess () {
            $location.path(originalPath);
        }, function onFail () {
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
