angular.module('control.manage.extra-services').controller('RequestAppCtrl', function ($rootScope, $scope, RequestAppService, Upload, ENV, $timeout, $alert, apps) {

    $scope.apps = angular.copy(apps) || {};

    var onAppSubmitted = function () {
        $alert({
            content: 'We have received your app request and will process it as soon as we can.',
            type: 'success',
            duration: 5,
        });
        $scope.justSubmitted = true;
        RequestAppService.getAppsObject().then(function (newApps) {
            $scope.apps = newApps;
        });
    };

    var onFail = function (res) {
        var error = (res.data && res.data.error) ? res.data.error : 'Could not reach the server.';
        $alert({
            content: error + ' If this persists, please let us know.',
            type: 'danger',
            duration: 15,
        });
        $scope.submittingForm = false;
        $scope.justSubmitted = false;
    };

    var onUploadFail = function (data) {
        var error = (data && data.error) ? data.error : 'could not reach the server';
        $alert({
            content: 'Failed to upload your image: ' + error,
            type: 'danger',
            duration: 15,
        });
        $scope.submittingForm = false;
        $scope.justSubmitted = false;
    };

    $scope.submittingForm = false;
    $scope.request = {};
    if (apps.android) {
        $scope.platform = 'iOS';
    }
    if (apps.iOS) {
        $scope.platform = 'Android';
    }
    if (!apps.android && !apps.iOS) {
        $scope.platform = 'Both';
    }

    // workaround for form validation
    $scope.$watch('form', function () {
        $scope.form.upload = {};
        $scope.form.upload.$invalid = false;
    });

    $scope.submit = function (platform, request) {
        $scope.submittingForm = true;
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.form.$invalid) {
            $scope.submittingForm = false;
            return;
        }
        request.username = $rootScope.service.username;

        switch (platform) {
            case 'Both':
                RequestAppService.submit('android', request).then(function () {
                    return RequestAppService.submit('iOS', request).then(onAppSubmitted, onFail);
                }, onFail);
                break;
            case 'Android':
                RequestAppService.submit('android', request).then(onAppSubmitted, onFail);
                break;
            case 'iOS':
                RequestAppService.submit('iOS', request).then(onAppSubmitted, onFail);
                break;
        }
    };

    // upload stuff
    $scope.onIconUpload = function ($files) {
        if ($files[0] === undefined) {
            return;
        }
        $scope.request.icon = null;
        $scope.isUploadingIcon = true;
        $scope.uploadProgressIcon = 0;
        $scope.upload = Upload.upload({
            url: ENV.apiEndpoint + '/control/apps/upload-image?imageType=icon',
            method: 'POST',
            data: {},
            file: $files[0],
            fileFormDataName: 'image',
        })
        .progress(function (evt) {
            $scope.uploadProgressIcon = parseInt(100.0 * evt.loaded / evt.total, 10);
        })
        .success(function (data) {
            $scope.isUploadingIcon = false;
            $scope.iconUploaded = true;
            $scope.request.icon = data.link;
        })
        .error(function (data) {
            $scope.isUploadingIcon = false;
            onUploadFail(data);
        });
    };

    $scope.onLogoUpload = function ($files) {
        if ($files[0] === undefined) {
            return;
        }
        $scope.request.logo = null;
        $scope.isUploadingLogo = true;
        $scope.uploadProgressLogo = 0;
        $scope.upload = Upload.upload({
            url: ENV.apiEndpoint + '/control/apps/upload-image',
            method: 'POST',
            data: {},
            file: $files[0],
            fileFormDataName: 'image',
        })
        .progress(function (evt) {
            $scope.uploadProgressLogo = parseInt(100.0 * evt.loaded / evt.total, 10);
        })
        .success(function (data) {
            $scope.isUploadingLogo = false;
            $scope.logoUploaded = true;
            $scope.request.logo = data.link;
        })
        .error(function (data) {
            $scope.isUploadingLogo = false;
            onUploadFail(data);
        });
    };

    $scope.onFeatureGraphicUpload = function ($files) {
        if ($files[0] === undefined) {
            return;
        }
        $scope.request.featureGraphic = null;
        $scope.isUploadingFeatureGraphic = true;
        $scope.uploadProgressFeatureGraphic = 0;
        $scope.upload = Upload.upload({
            url: ENV.apiEndpoint + '/control/apps/upload-image?imageType=featureGraphic',
            method: 'POST',
            data: {},
            file: $files[0],
            fileFormDataName: 'image',
        })
        .progress(function (evt) {
            $scope.uploadProgressFeatureGraphic = parseInt(100.0 * evt.loaded / evt.total, 10);
        })
        .success(function (data) {
            $scope.isUploadingFeatureGraphic = false;
            $scope.featureGraphicUploaded = true;
            $scope.request.featureGraphic = data.link;
        })
        .error(function (data) {
            $scope.isUploadingFeatureGraphic = false;
            onUploadFail(data);
        });
    };
});
