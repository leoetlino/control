define(['control'], function (control) {
    control.register.controller('ManageCtrl', function($scope,ManageService) {
        $scope.isReady=false;
        var callback=function(res){
            $scope.products=[];
            var appCheck=function(app,l){
                res.data[l.key].app=app;
                $scope.products.push(res.data[l.key]);
                $scope.activeTab=$scope.products[0].id;
            };

            for (var key in res.data){
                if (res.data[key].status === 'Active') {
                    ManageService.hasApp(res.data[key].username,appCheck,{key:key});
                }
            }

            $scope.isReady=true;
        };
        ManageService.list(callback);

        $scope.isTabActive=function(tabid){
            return $scope.activeTab===tabid;
        };
        $scope.selectTab=function(tabid){
            $scope.activeTab=tabid;
        };

    });
});
