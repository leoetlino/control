define(['control'], function(control) {
    control.register.controller('RequestappCtrl', function($scope, RequestappService, $upload) {
        $scope.isReady=false
        
        $scope.website = ""
        $scope.facebook = ""
        $scope.twitter = ""
        $scope.platform = ""
        $scope.products = []
        $scope.maySubmitApp=false

        //get list accounts
        var callback = function(res) {
            $scope.products = []
            var appCheck = function(app, l) {
                res.data[l.key].app = app;
                $scope.products.push(res.data[l.key])
                $scope.isReady=true
            }

            for (var key in res.data) {
                if (res.data[key].status == "Active") {
                    RequestappService.hasApp(res.data[key].username, appCheck, {
                        key: key
                    })
                }
            }
        }
        RequestappService.list(callback)


        //upload stuff
        $scope.onIconUpload = function($files) {
            $scope.isUploadingIcon=true
            $scope.uploadProgressIcon=0
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: 'http://itframe-c9-imstr.c9.io/control/apps/iconupload/', 
                    method: 'POST',
                    data: {},
                    file: file, 
                }).progress(function(evt) {
                    $scope.uploadProgressIcon= parseInt(100.0 * evt.loaded / evt.total)
                }).success(function(data, status, headers, config) {
                    $scope.isUploadingIcon=false
                    $scope.isUploadedIcon=true
                    $scope.icon=data.name;
                });
            }
        };
        
        $scope.onLogoUpload = function($files) {
            $scope.isUploadingLogo=true
            $scope.uploadProgressLogo=0
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: 'http://itframe-c9-imstr.c9.io/control/apps/logoupload/', 
                    method: 'POST',
                    data: {},
                    file: file, 
                }).progress(function(evt) {
                    $scope.uploadProgressLogo= parseInt(100.0 * evt.loaded / evt.total)
                }).success(function(data, status, headers, config) {
                    $scope.isUploadingLogo=false
                    $scope.isUploadedLogo=true
                    $scope.logo=data.name;
                });
            }
        };
    });
});
