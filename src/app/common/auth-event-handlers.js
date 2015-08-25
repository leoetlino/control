angular.module('control').run(function ($rootScope, $location, $window, $alert, $modal, $timeout, AUTH_EVENTS, ServicesService, Session) {

    function initServices () {
        // returns a promise.
        return ServicesService.initAndGetService().then(function onInitServiceSuccess (service) {
            $rootScope.servicesLoaded = true;
            $rootScope.services = ServicesService.getServicesList();
            $rootScope.service = service;
            return service;
        });
    }

    var alert;

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
        ServicesService.invalidateCache();
        return initServices().then(function onInitSuccess () {
            $location.path('/'); // This will trigger a redirect to originalPath
        }, function onInitFail () {
            $location.path('/');
            $alert({
                content: 'Something went wrong while getting your service data. The page will reload to try again.',
                type: 'danger',
                duration: 10,
            });
            $timeout(function () {
                $window.location.reload();
            }, 5000);
        });
    });

    $rootScope.$on(AUTH_EVENTS.loginFailed, function onLoginFail () {
        $alert({
            content: 'Couldn\'t log in. Please check your credentials. If you forgot your password, you can reset it from the client area.',
            type: 'danger',
            duration: 10,
        });
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function onLogoutSuccess () {
        var modal = $modal({
            content: '<style>.modal{display: none !important}</style>',
            backdrop: 'static',
            html: true,
            keyboard: false,
        });
        $alert({
            content: 'You have been logged out.',
            type: 'success',
            dismissable: false,
            duration: 2,
        });
        $timeout(function () {
            modal.hide();
            modal.destroy();
            $location.path('/log-in');
        }, 2000);
    });

    $rootScope.$on(AUTH_EVENTS.logoutFailed, function onLogoutFail () {
        $alert({
            content: 'Couldn\'t log you out. Please try again. If the problem persists, reload the page and contact us.',
            type: 'danger',
            duration: 10,
        });
    });

    $rootScope.$on(AUTH_EVENTS.badRequest, function onBadRequest () {
        if (alert) {
            alert.destroy();
        }
        alert = $alert({
            content: 'Something went wrong. Please try again. If the problem persists, reload the page and contact us.',
            type: 'danger',
            duration: 10,
        });
    });

    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function onSessionTimeout () {
        Session.destroy();
        $location.path('/log-in');
        if (alert) {
            alert.destroy();
        }
        alert = $alert({
            content: 'Your session has expired, so you have been logged out.',
            type: 'warning',
        });
    });

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function onNotAuthenticatedEvent () {
        $location.path('/log-in');
        $alert({
            content: 'Please log in to continue.',
            type: 'warning',
            duration: 5,
        });
    });

    $rootScope.$on(AUTH_EVENTS.notAuthorized, function onNotAuthorizedEvent () {
        $location.path('/log-in');
        $alert({
            title: 'Access denied.',
            content: 'You are not authorised to do this.',
            type: 'warning',
            duration: 5,
        });
    });

});
