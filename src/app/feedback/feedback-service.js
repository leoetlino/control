angular.module('control.feedback').factory('FeedbackService', function ($http, ENV) {
    return {
        send: function (subject, message) {
            return $http.post(ENV.apiEndpoint + '/control/feedback', {
                subject: subject,
                message: message,
            });
        },
    };
});
