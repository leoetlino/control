control.controller('ManageCtrl', function ($rootScope, service, $scope, ManageService) {
    $rootScope.service = service;
    $scope.sections = ManageService.getSections();
});
