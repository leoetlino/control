define(['control'], function (control) {
    control.factory('ManageService', function ($http, localStorageService) {
        return {
            list:function(callback){
                $http.post('https://itframe.shoutca.st/control/accounts/', {email:localStorageService.get('email'),key:localStorageService.get('token')})
                    .then(callback);
            },

            hasApp:function(username,callback,l){
                var app={};
                var calliOS=function(andrdata){
                    app.android=andrdata.data.hasAndoidapp;
                    $http.post('https://itframe.shoutca.st/control/hasiOSapp/', {email:localStorageService.get('email'),key:localStorageService.get('token'),username:username})
                    .then(checkiOS);
                };
                var checkiOS=function(iosdata){
                    app.ios=iosdata.data.hasiOSapp;
                    callback(app,l);
                };
                $http.post('https://itframe.shoutca.st/control/hasAndroidapp/', {email:localStorageService.get('email'),key:localStorageService.get('token'),username:username})
                    .then(calliOS);
            }
        };
    });

});
