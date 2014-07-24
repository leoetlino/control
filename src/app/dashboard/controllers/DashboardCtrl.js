define(['control'], function (control) {
    control.controller('DashboardCtrl', function ($scope, summary, services) {
        $scope.summary = summary;
        $scope.services = services;
    });
});
