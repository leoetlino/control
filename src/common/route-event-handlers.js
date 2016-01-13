import { angular } from "../vendor";

export default /*@ngInject*/ function ($rootScope, $location, USER_ROLES, AUTH_EVENTS, AuthChecker) {

  $rootScope.$on("routeSegmentChangeStart", function onRouteSegmentChangeStart(event, index, segment) {
    if (!segment) {
      return;
    }
    if ($rootScope.service &&
            $rootScope.service.id &&
            segment.params.visibleForCastOnly &&
            $rootScope.service.group.toLowerCase().indexOf("nodes") === -1) {
      event.preventDefault();
      $rootScope.$broadcast("cast-only-route");
    }
    $rootScope.routeLoading = true;
  });

  $rootScope.$on("routeSegmentChange", function onRouteSegmentChange(event, args) {
    if (!args.segment) {
      return;
    }
    $rootScope.pageTitle = args.segment.params.title;
    $rootScope.routeLoading = false;
  });

  $rootScope.$on("routeSegmentResolveStart", function onRouteSegmentReloadStart(event, index) {
    if (index !== 0) {
      $rootScope.routeResolving = true;
    }
  });

  $rootScope.$on("routeSegmentResolve", function onRouteSegmentReload(event, index) {
    if (index !== 0) {
      $rootScope.routeResolving = false;
    }
  });

  var originalPath = null;

  $rootScope.$on("$routeChangeStart", function onRouteChangeStart(event, next) {
    var segment = angular.module("control").segments[next.$$route.segment];
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
        if (next.$$route.originalPath !== "/log-in") {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          return;
        }
      } else {
                // user is not logged in
        if (next.$$route.originalPath !== "/log-in") {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          originalPath = next.$$route.originalPath;
          return;
        }
      }
    }

    if (originalPath && AuthChecker.isAuthenticated()) {
      $location.path(originalPath).replace();
      originalPath = null;
    }
  });

}
