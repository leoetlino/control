angular.module('control').controller('FormUploadCtrl', function (
    $scope,
    Upload
) {
    let model = $scope.model;
    let options = $scope.options;
    let templateOptions = options.templateOptions;

    if (!templateOptions.url) {
        throw new Error('templateOptions.url is undefined');
    }

    this.resetState = () => {
        this.isUploading = false;
        this.isUploaded = false;
        this.hasError = false;
        this.uploadProgress = null;
    };
    this.resetState();

    this.upload = ($files) => {
        if ($files[0] === undefined) {
            return;
        }
        this.resetState();
        model[options.key] = undefined;
        this.isUploading = true;
        this.uploadProgress = 0;
        Upload.upload({
            url: templateOptions.url,
            method: 'POST',
            data: {},
            file: $files[0],
            fileFormDataName: templateOptions.fileFormName || 'image',
        })
        .progress(evt => this.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10))
        .success(data => {
            this.isUploading = false;
            this.isUploaded = true;
            model[options.key] = data.link;
        })
        .error(() => {
            this.resetState();
            this.hasError = true;
        });
    };
});
