angular.module('control.manage.cast').controller('DirectoriesCtrl', function ($scope, config, choices, DirectoriesService) {
    var self = this;

    self.config = angular.copy(config);
    self.directories = angular.copy(choices);

    self.directories.forEach(function (directory) {
        directory.isEnabled = (config.directories.Icecast.indexOf(directory.url) !== -1);
        $scope.$watch(function () { return directory.isEnabled; }, function (newIsEnabled, oldIsEnabled) {
            if (newIsEnabled === oldIsEnabled) {
                return;
            }
            if (newIsEnabled) {
                self.isSaving = true;
                DirectoriesService.enableDirectory(directory).then(function () { self.isSaving = false; });
            }
            if (!newIsEnabled) {
                self.isSaving = true;
                DirectoriesService.disableDirectory(directory).then(function () { self.isSaving = false; });
            }
        });
    });

    self.getDirectoryByName = function (name) {
        return _.findWhere(self.directories, { name: name });
    };

});
