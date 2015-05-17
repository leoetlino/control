define(['control'], function (control) {
    control.controller('ManageCtrl', function (service, $rootScope, $scope) {
        $scope.product = service;
    });
});
