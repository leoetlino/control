define(['control'], function (control) {
    control.factory('DashService', function ($http, localStorageService, AuthService) {
        return {
            info:function(callback){
                if (!AuthService.isAuthenticated())return;
                $http.post('https://itframe-c9-imstr.c9.io/control/userInfo/', {email:localStorageService.get('email'),key:localStorageService.get('token')})
                    .then(callback)
            }
        };
    });

});
