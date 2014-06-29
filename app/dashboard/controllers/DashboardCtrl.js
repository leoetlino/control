define(['control'], function (control) {
    control.register.controller('DashboardCtrl', function($scope, DashService) {
        $scope.isReady=false;
        var update=function(res){
            $scope.message = 'Hello '+res.data.firstname;
            $scope.isReady=true
        }
        DashService.info(update)
    });
});
