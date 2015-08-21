angular.module('control.manage.extra-services').controller('AppRequestCtrl', function (
    RequestAppService,
    $alert,
    $q,
    $scope,
    $routeParams,
    $location,
    app) {

    var ctrl = this;
    var platform = $routeParams.platform;

    ctrl.tabTypes = ['facebook', 'twitter', 'website'];
    ctrl.app = angular.copy(app) || {};
    ctrl.isiOSApp = (platform === 'iOS');
    ctrl.isAndroidApp = (platform === 'android');
    ctrl.appType = (platform === 'iOS') ? 'iOS' : 'Android';

    /////////////////
    // Editable form
    /////////////////

    ctrl.addTab = function (type, value) {
        if (ctrl.app.tabs.length === 3) {
            $alert({
                content: 'You cannot have more than 3 tabs.',
                type: 'danger',
                duration: 5,
            });
            return;
        }
        ctrl.app.tabs.push({
            type: type || '',
            value: value || '',
        });
    };

    ctrl.removeTab = function (tab) {
        if (ctrl.app.tabs.length === 1) {
            $alert({
                content: 'You must have at least one tab.',
                type: 'danger',
                duration: 5,
            });
            return;
        }
        ctrl.app.tabs = _.without(ctrl.app.tabs, tab);
    };

    ctrl.beforeSave = function () {
        ctrl.disableForm = true;
    };

    ctrl.save = function () {
        if (ctrl.app.tabs.length === 0) {
            $alert({
                content: 'You must have at least one tab.',
                type: 'danger',
                duration: 5,
            });
            ctrl.disableForm = false;
            return $q.reject();
        }

        if (ctrl.app.tabs.length > 3) {
            $alert({
                content: 'You cannot have more than 3 tabs.',
                type: 'danger',
                duration: 5,
            });
            ctrl.disableForm = false;
            return $q.reject();
        }

        if ($scope.editableForm.$invalid) {
            $alert({
                content: 'You have not filled in the form correctly.',
                type: 'danger',
                duration: 5,
            });
            ctrl.disableForm = false;
            return $q.reject();
        }

        return RequestAppService.update(platform, ctrl.app).then(function onSuccess () {
            $alert({
                content: 'Successfully updated your app request. It is now pending review from our team.',
                type: 'success',
                duration: 3,
            });
            ctrl.disableForm = false;
            return RequestAppService.getRequest(platform).then(function (newApp) {
                ctrl.app = newApp;
            });
        }, function onFail (response) {
            var errorMessage = response.data.error + ' Your updates were not saved. Please try again.';
            if (response.data.error.indexOf('INVALID') !== -1) {
                errorMessage = 'Your app request is invalid. Please fill in all required fields correctly.';
            }
            $alert({
                content: errorMessage,
                type: 'danger',
                duration: 5,
            });
            ctrl.disableForm = false;
            return errorMessage;
        });
    };

    var _app;
    ctrl.onEdit = function () {
        _app = angular.copy(ctrl.app);
    };
    ctrl.onCancel = function () {
        if (_app) {
            ctrl.app = angular.copy(_app);
        }
    };
});
