define(['control'], function (control) {
    control.factory('DashService', function ($http, Session, localStorageService) {
        return {
            getInfo: function (callback) {
                return $http.post('https://itframe.shoutca.st/control/userInfo/', {email:localStorageService.get('email'),key:localStorageService.get('token')})
                    .then(callback);
            }
        };
    });

});
