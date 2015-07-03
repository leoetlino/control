define(['control'], function (control) {
    control.controller('ManageCtrl', function ($scope, service) {
        $scope.service = service;
    });
});
