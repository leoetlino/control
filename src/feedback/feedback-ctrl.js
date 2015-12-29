export default /*@ngInject*/ function ($scope, FeedbackService, $alert) {
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
            $alert({
                content: 'Something went wrong while sending your feedback. Please try again.',
                type: 'danger',
                duration: 10,
            });
            $scope.sending = false;
        });
    };
}
