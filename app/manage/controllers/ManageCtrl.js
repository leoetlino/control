define(['control'], function (control) {
    control.register.controller('ManageCtrl', function($scope,ManageService) {
        $scope.isReady=false
        var callback=function(res){
            $scope.products=[]
            for (var key in res.data){
                if (res.data[key].status=="Active") $scope.products.push(res.data[key]);
            }
            
            $scope.isReady=true
            $scope.activeTab=$scope.products[0].id
        }
        ManageService.list(callback)
        
        $scope.isTabActive=function(tabid){
            return $scope.activeTab===tabid
        }
        $scope.selectTab=function(tabid){
            $scope.activeTab=tabid
        }
        
    });
});
