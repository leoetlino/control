control.run(function ($rootScope, $location, USER_ROLES, AUTH_EVENTS, AuthChecker) {

    $rootScope.$on('routeSegmentChange', function (event, route) {
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

        if (originalPath) {
            $location.path(originalPath).replace();
            originalPath = null;
        }
    });

});
