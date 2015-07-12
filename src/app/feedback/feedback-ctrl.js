control.controller('FeedbackCtrl', function ($scope, FeedbackService, flash) {
    $scope.sent = false;
    $scope.submit = function () {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.feedbackForm.$invalid) {
            return;
        }
        $scope.sending = true;
        FeedbackService.send($scope.form.subject, $scope.form.feedback).then(function () {
            $scope.sent = true;
            $scope.sending = false;
        }, function () {
            flash.to('alert-general').error = 'Something went wrong while sending your feedback. Please try again.';
            $scope.sending = false;
        });
    };
});
