control.controller('NavigationCtrl', function ($scope, $location, $rootScope, $route, USER_ROLES, AUTH_EVENTS, AuthChecker, AuthService, Session, ServicesService, $window, $alert) {

    $scope.isActive = function (viewLocation) {
        return (viewLocation === '/') ? viewLocation === $location.path() : $location.path().indexOf(viewLocation) > -1;
    };

    $scope.logOut = function () {
        AuthService.logOut().then(function onLogoutSuccess () {
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        }, function onLogoutFail () {
            $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
        });
    };

    //////////////////
    // Top bar player
    //////////////////

    var audio;
    $scope.player = {};
    $scope.player.states = { stopped: 0, buffering: 1, playing: 2 };
    $scope.player.state = $scope.player.states.stopped;

    $scope.player.toggle = function (streamUrl) {
        if ($scope.player.state === $scope.player.states.playing && audio !== null) {
            audio.pause();
            audio.src = '';
            audio = null;
            $scope.player.state = $scope.player.states.stopped;
            return;
        }
        audio = new Audio(streamUrl);
        audio.play();
        audio.addEventListener('playing', function () {
            $scope.player.state = $scope.player.states.playing;
            $scope.$apply();
        });
        audio.addEventListener('error', function () {
            $scope.player.state = $scope.player.states.stopped;
            $scope.$apply();
        });
        $scope.player.state = $scope.player.states.buffering;
    };

    ////////////
    // Services
    ////////////

    function initServices () {
        // returns a promise.
        return ServicesService.initAndGetService().then(function onInitServiceSuccess (service) {
            $rootScope.servicesLoaded = true;
            $rootScope.services = ServicesService.getServicesList();
            $rootScope.service = service;
            return service;
        });
    }

    $rootScope.invalidateCache = function () {
        $rootScope.$broadcast('invalidate-cache');
    };

    $rootScope.reloadServices = function () {
        $rootScope.invalidateCache();
        return initServices();
    };

    if (AuthChecker.isAuthenticated()) {
        initServices();
    }

    $rootScope.$watch('service.username', function onSelectedServiceUsernameChange (newUsername) {
        if (!AuthChecker.isAuthenticated()) {
            return;
        }
        if (newUsername && $location.search().username && (newUsername !== $location.search().username)) {
            $location.search('username', null);
            $location.search('serviceId', null);
        }
    });

    $rootScope.$watch('service.id', function onSelectedServiceIdChange (newId, oldId) {
        if (!AuthChecker.isAuthenticated()) {
            return;
        }
        if (newId && $location.search().serviceId && (newId !== $location.search().serviceId)) {
            $location.search('username', null);
            $location.search('serviceId', null);
        }
        if (oldId && newId !== oldId) {
            $rootScope.$broadcast('selected-service-changed', newId);
        }
    });

    var alert;

    $rootScope.$on('cast-only-route', function onCastOnlyRouteEvent () {
        $rootScope.routeLoading = false;
        if (alert) {
            alert.hide();
        }
        alert = $alert({
            content: 'The page you are trying to access is only available for Cast nodes.',
            type: 'danger',
            duration: 5
        });
        $location.path('/manage/information');
    });

    $rootScope.$on('invalid-service', function onInvalidServiceEvent () {
        $rootScope.routeLoading = false;
        $alert({
            content: 'The service does not exist.',
            type: 'danger',
            duration: 5
        });
        $location.search('username', null);
        $location.search('serviceId', null);
        $location.path('/manage');
    });

    $rootScope.$on('server-error', function onServerError (event, error) {
        $alert({
            content: error.message + ' (' + error.code + ')',
            type: 'danger',
            duration: error.alertDuration
        });
    });

});
