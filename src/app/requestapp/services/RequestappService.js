define(['control'], function (control) {
    control.factory('RequestappService', function ($http, ENV) {
        return {
            list:function(callback){
                $http.post('https://' + ENV.apiEndpoint + '/control/accounts/').then(callback);
            },

            hasApp:function(username,callback,l){
                var app={};
                var calliOS=function(andrdata){
                    app.android=andrdata.data.hasAndoidapp;
                    $http.post('https://' + ENV.apiEndpoint + '/control/hasiOSapp/', {username:  username}).then(checkiOS);
                };
                var checkiOS=function(iosdata){
                    app.ios=iosdata.data.hasiOSapp;
                    callback(app,l);
                };
                $http.post('https://' + ENV.apiEndpoint + '/control/hasAndroidapp/', {username:  username}).then(calliOS);
            },
            submitAndroid:function(name,desc,site,facebook,twitter,bg,icon,logo,username){
                $http.post('https://' + ENV.apiEndpoint + '/control/apps/submit/Anrdoid/', {
                    name:name,
                    description:desc,
                    facebook:facebook,
                    twitter:twitter,
                    bg:bg,
                    icon:icon,
                    logo:logo,
                    username:username
                });
            },
            submitiOS:function(name,desc,keywords,site,facebook,twitter,bg,tint,icon,logo,username){
                $http.post('https://' + ENV.apiEndpoint + '/control/apps/submit/iOS/', {
                    name:name,
                    description:desc,
                    tags:keywords,
                    site:site,
                    facebook:facebook,
                    twitter:twitter,
                    bg:bg,
                    tint:tint,
                    icon:icon,
                    logo:logo,
                    username:username
                });
            }
        };
    });

});
