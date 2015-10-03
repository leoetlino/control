angular.module('control.manage.extra-services').controller('PlayerCtrl', (
    $rootScope,
    $scope,
    $sce,
    $alert,
    settings,
    PlayerService) => {

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Preview
    ///////////////////////////////////////////////////////////////////////////////////////////////

    $scope.playerUrl = `https://player.shoutca.st/?username=${$scope.service.username}`;
    $scope.previewUrl = $sce.trustAsResourceUrl($scope.playerUrl);
    $scope.refreshPreview = () => {
        $scope.previewUrl = $sce.trustAsResourceUrl($scope.playerUrl + `&t=${new Date().getTime()}`);
    };
    $scope.previewWidth = 300;
    $scope.previewHeight = 150;
    $scope.setPreviewSize = (width = 300, height = 150) => {
        if (width) {
            $scope.previewWidth = width;
        }
        if (height) {
            $scope.previewHeight = height;
        }
    };
    $scope.$on('angular-resizable.resizeEnd', (event, { width, height } = {}) =>
        $scope.setPreviewSize(width, height));

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Settings
    ///////////////////////////////////////////////////////////////////////////////////////////////

    let initialiseSettings = (sourceSettings = settings) => {
        $scope.settings = angular.copy(sourceSettings) || {};
        $scope.settings.buttons = $scope.settings.buttons || [];
    };

    $scope.disableForm = false;
    initialiseSettings();

    $scope.saveSettings = (newSettings) => {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.form.$invalid) {
            $alert({
                content: 'Please fill in the form correctly first.',
                type: 'danger',
                duration: 2,
            });
            return;
        }
        $scope.disableForm = true;
        PlayerService.saveSettings($rootScope.service.username, newSettings).then(() => {
            $scope.disableForm = false;
            $scope.refreshPreview();
            $alert({
                content: 'New settings saved.',
                type: 'success',
                duration: 5,
            });
        }, (res) => {
            $alert({
                content: 'Could not save your settings (' + res.data.error + '). Your settings were not saved. Please try again.',
                type: 'danger',
                duration: 10,
            });
            $scope.disableForm = false;
        });
    };

    $scope.removeSettings = () => {
        initialiseSettings({});
        $scope.disableForm = true;
        PlayerService.removeSettings($rootScope.service.username).then(() => {
            $scope.disableForm = false;
            $alert({
                content: 'Your Player settings have been removed. Your Player page is now inaccessible.',
                type: 'success',
                duration: 5,
            });
        }, (res) => {
            $alert({
                content: 'Could not remove your settings (' + res.data.error + '). Your settings were not removed. Please try again.',
                type: 'danger',
                duration: 10,
            });
            $scope.disableForm = false;
        });
    };

    $scope.addButton = ({ name = 'Button', icon = 'fa-globe', url = '' } = {}) => {
        $scope.settings.buttons.push({ name, icon, url });
    };

    $scope.removeButton = (button) => {
        $scope.settings.buttons = _.without($scope.settings.buttons, button);
    };

});
