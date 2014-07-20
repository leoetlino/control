define(['control'], function (control) {
    control.controller('ManageCtrl', function ($scope, services) {
        $scope.products = services;
    });
});
