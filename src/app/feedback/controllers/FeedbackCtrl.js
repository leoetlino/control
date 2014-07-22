define(['control'], function (control) {
    control.controller('FeedbackCtrl', function($scope, FeedbackService) {
        $scope.form={};
        $scope.fillInAllFields=false;
        $scope.didSend=false;
        $scope.submit=function(){
            if ($scope.form.title.length<=0 || $scope.form.feedback.length<=0){
                $scope.fillInAllFields=true;
                return;
            }
            FeedbackService.send($scope.form.title,$scope.form.feedback);
            $scope.fillInAllFields=false;
            $scope.didSend=true;
            $scope.form={};
        };
    });
});
