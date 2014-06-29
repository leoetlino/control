define(['control'], function (control) {
    control.register.controller('FeedbackCtrl', function($scope) {
        $scope.fillInAllFields=false
        $scope.didSend=false
        
        $scope.submit=function(){
            if ($scope.title.length<=0 || $scope.feedback.length<=0){
                $scope.fillInAllFields=true
                return;
            }
            $scope.fillInAllFields=false
            $scope.didSend=true
            $scope.title=""
            $scope.feedback=""
        }
    });
});
