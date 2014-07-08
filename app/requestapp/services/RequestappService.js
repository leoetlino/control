define(['control'], function (control) {
    control.factory('RequestappService', function ($http, localStorageService, AuthService) {
        return {
            list:function(callback){
                if (!AuthService.isAuthenticated())return;
                $http.post('https://itframe.shoutca.st/control/accounts/', {email:localStorageService.get('email'),key:localStorageService.get('token')})
                    .then(callback)
            },
            
            hasApp:function(username,callback,l){
                if (!AuthService.isAuthenticated())return;
                var app={}
                var calliOS=function(andrdata){
                    app.android=andrdata.data.hasAndoidapp
                    $http.post('https://itframe.shoutca.st/control/hasiOSapp/', {email:localStorageService.get('email'),key:localStorageService.get('token'),username:username})
                    .then(checkiOS)
                }
                var checkiOS=function(iosdata){
                    app.ios=iosdata.data.hasiOSapp
                    callback(app,l)
                }
                $http.post('https://itframe.shoutca.st/control/hasAndroidapp/', {email:localStorageService.get('email'),key:localStorageService.get('token'),username:username})
                    .then(calliOS)
            },
            submitAndroid:function(name,desc,site,facebook,twitter,bg,icon,logo){
                if (!AuthService.isAuthenticated())return;
                $http.post('https://itframe.shoutca.st/control/apps/submit/Anrdoid/', {
                    email:localStorageService.get('email'),
                    key:localStorageService.get('token'),
                    name:name,
                    desc:desc,
                    facebook:facebook,
                    twitter:twitter,
                    bg:bg,
                    icon:icon,
                    logo:logo
                })
                    .then(function(andrdata) {
                    })
            },
            submitiOS:function(name,desc,keywords,site,facebook,twitter,bg,icon,logo){
                if (!AuthService.isAuthenticated())return;
                $http.post('https://itframe.shoutca.st/control/apps/submit/iOS/', {
                    email:localStorageService.get('email'),
                    key:localStorageService.get('token'),
                    name:name,
                    desc:desc,
                    keywords:keywords,
                    site:site,
                    facebook:facebook,
                    twitter:twitter,
                    bg:bg,
                    icon:icon,
                    logo:logo
                })
                    .then(function(andrdata) {
                    })
            }
        };
    });

});
