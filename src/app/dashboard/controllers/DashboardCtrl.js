define(['control'], function (control) {
    control.controller('DashboardCtrl', function($scope, summary) {
        $scope.message = 'Hello, ' + summary.firstname + '.';
    });
});
