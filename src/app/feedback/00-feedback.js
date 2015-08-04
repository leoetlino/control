angular.module('control.feedback', []).run(function ($routeSegmentProvider, USER_ROLES) {
    $routeSegmentProvider
        .when('/feedback', 'feedback')
        .segment('feedback', {
            templateUrl: '/app/feedback/feedback.html',
            authorizedRoles: [USER_ROLES.all],
            title: 'Send your feedback',
            controller: 'FeedbackCtrl',
        });
});
