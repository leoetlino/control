define(['control'], function (control) {
    control.factory('ManageService', function ($http, localStorageService, AuthService) {
        return {
            list:function(callback){
                if (!AuthService.isAuthenticated())return;
                $http.post('https://itframe-c9-imstr.c9.io/control/accounts/', {email:localStorageService.get('email'),key:localStorageService.get('token')})
                    .then(callback)
            }
        };
    });

});
