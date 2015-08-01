angular.module('control.manage.extra-services').controller('RequestAppCtrl', function ($rootScope, $scope, RequestAppService, Upload, ENV, $timeout, $alert) {

    var onAppSubmitted = function () {
        $alert({
            content: 'We have received your app request and will process it as soon as we can.',
            type: 'success',
            duration: 5
        });
        $scope.justSubmitted = true;
        $timeout($scope.reloadServices, 2000);
    };

    $scope.submittingForm = false;
    $scope.request = {};
    if ($rootScope.service.apps.android) {
        $scope.request.platform = 'iOS';
    }
    if ($rootScope.service.apps.iOS) {
        $scope.request.platform = 'Android';
    }
    if (!$rootScope.service.apps.android && !$rootScope.service.apps.iOS) {
        $scope.request.platform = 'Both';
    }

    // workaround for form validation
    $scope.$watch('form', function () {
        $scope.form.upload = {};
        $scope.form.upload.$invalid = false;
    });

    $scope.submit = function (request) {
        $scope.submittingForm = true;
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.form.$invalid) {
            $scope.submittingForm = false;
            return;
        }
        request.username = $rootScope.service.username;
        switch (request.platform) {
            case 'Both':
                RequestAppService.submit('Android', request).then(onAppSubmitted);
                RequestAppService.submit('iOS', request).then(onAppSubmitted);
                break;
            case 'Android':
                RequestAppService.submit('Android', request).then(onAppSubmitted);
                break;
            case 'iOS':
                RequestAppService.submit('iOS', request).then(onAppSubmitted);
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
            url: 'https://' + ENV.apiEndpoint + '/control/apps/iconupload/',
            method: 'POST',
            data: {},
            file: $files[0]
        })
        .progress(function (evt) {
            $scope.uploadProgressIcon = parseInt(100.0 * evt.loaded / evt.total, 10);
        })
        .success(function (data) {
            $scope.isUploadingIcon = false;
            $scope.iconUploaded = true;
            $scope.request.icon = data.name;
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
            url: 'https://' + ENV.apiEndpoint + '/control/apps/logoupload/',
            method: 'POST',
            data: {},
            file: $files[0]
        })
        .progress(function (evt) {
            $scope.uploadProgressLogo = parseInt(100.0 * evt.loaded / evt.total, 10);
        })
        .success(function (data) {
            $scope.isUploadingLogo = false;
            $scope.logoUploaded = true;
            $scope.request.logo = data.name;
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
            url: 'https://' + ENV.apiEndpoint + '/control/apps/featureGraphicUpload/',
            method: 'POST',
            data: {},
            file: $files[0]
        })
        .progress(function (evt) {
            $scope.uploadProgressFeatureGraphic = parseInt(100.0 * evt.loaded / evt.total, 10);
        })
        .success(function (data) {
            $scope.isUploadingFeatureGraphic = false;
            $scope.featureGraphicUploaded = true;
            $scope.request.featureGraphic = data.name;
        });
    };
});
