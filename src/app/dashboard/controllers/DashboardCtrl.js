define(['control'], function (control) {
    control.controller('DashboardCtrl', function ($scope, summary) {
        $scope.summary = summary;
    });
});
