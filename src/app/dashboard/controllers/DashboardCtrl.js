define(['control'], function (control) {
    control.register.controller('DashboardCtrl', function($scope, summary) {
        $scope.message = 'Hello, ' + summary.firstname + '.';
    });
});
