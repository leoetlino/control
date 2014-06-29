define(['control'], function (control) {
    control.factory('FeedbackService', function ($http, localStorageService, AuthService) {
        return {
            send:function(title,message){
                if (!AuthService.isAuthenticated())return;
                $http.post('https://itframe-c9-imstr.c9.io/control/feedback/', {email:localStorageService.get('email'),key:localStorageService.get('token'),title:title,message:message})
            }
        };
    });

});
