define(['control'], function (control) {
    control.factory('FeedbackService', function ($http, ENV) {
        return {
            send: function (subject, message) {
                return $http.post('https://' + ENV.apiEndpoint + '/control/feedback/', {'title': subject, 'message': message});
            }
        };
    });

});
