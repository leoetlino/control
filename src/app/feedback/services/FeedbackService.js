define(['control'], function (control) {
    control.factory('FeedbackService', function ($http, localStorageService) {
        return {
            send: function (title, message) {
                $http.post('https://itframe.shoutca.st/control/feedback/', {email:localStorageService.get('email'),key:localStorageService.get('token'), 'title': title, 'message': message});
            }
        };
    });

});
