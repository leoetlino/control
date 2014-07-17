define(['control'], function (control) {
    control.factory('ManageService', function ($http, ENV) {
        return {
            list:function(callback){
                $http.post('https://' + ENV.apiEndpoint + '/control/accounts/').then(callback);
            },

            hasApp:function(username,callback,l){
                var app={};
                var calliOS=function(andrdata){
                    app.android=andrdata.data.hasAndoidapp;
                    $http.post('https://' + ENV.apiEndpoint + '/control/hasiOSapp/', {username: username}).then(checkiOS);
                };
                var checkiOS=function(iosdata){
                    app.ios=iosdata.data.hasiOSapp;
                    callback(app,l);
                };
                $http.post('https://' + ENV.apiEndpoint + '/control/hasAndroidapp/', {username:username}).then(calliOS);
            }
        };
    });

});
