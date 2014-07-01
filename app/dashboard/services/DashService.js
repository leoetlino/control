define(['control'], function (control) {
    control.factory('DashService', function ($http, Session, AuthService) {
        return {
            getInfo: function () {
                if (!AuthService.isAuthenticated()) return;
                return $http.post('https://itframe-c9-imstr.c9.io/control/userInfo/', {
                    email: Session.email,
                    key: Session.token
                });
            }
        };
    });

});
