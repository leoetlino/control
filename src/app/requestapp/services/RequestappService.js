define(['control'], function (control) {
    control.factory('RequestappService', function ($http, localStorageService) {
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
            },
            submitAndroid:function(name,desc,site,facebook,twitter,bg,icon,logo,username){
                $http.post('https://itframe.shoutca.st/control/apps/submit/Anrdoid/', {
                    email:localStorageService.get('email'),
                    key:localStorageService.get('token'),
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
                $http.post('https://itframe.shoutca.st/control/apps/submit/iOS/', {
                    email:localStorageService.get('email'),
                    key:localStorageService.get('token'),
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
