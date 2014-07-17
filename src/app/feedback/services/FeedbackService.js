define(['control'], function (control) {
    control.factory('FeedbackService', function ($http, ENV) {
        return {
            send: function (title, message) {
                $http.post('https://' + ENV.apiEndpoint + '/control/feedback/', {'title': title, 'message': message});
            }
        };
    });

});
