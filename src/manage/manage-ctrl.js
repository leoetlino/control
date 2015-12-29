export default /*@ngInject*/ function ($rootScope, service, $scope, ManageService) {
    $rootScope.service = service;
    $scope.sections = ManageService.getSections();
}
