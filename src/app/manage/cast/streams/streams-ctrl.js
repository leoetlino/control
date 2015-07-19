angular.module('control.manage.cast').controller('StreamsCtrl', function (config, StreamsService, $alert, $q, $scope) {
    var self = this;

    self.streamNames = ['32kbps', '64kbps', '96kbps', '128kbps', '192kbps', '256kbps', '320kbps'];
    self.streams = angular.copy(config.streams) || [];

    self.addStream = function () {
        if (self.streams.length === 3) {
            $alert({
                content: 'You cannot have more than 3 streams.',
                type: 'danger',
                duration: 5
            });
            return;
        }
        self.streams.push({});
    };

    self.removeStream = function (stream) {
        if (self.streams.length === 1) {
            $alert({
                content: 'You must have at least one stream.',
                type: 'danger',
                duration: 5
            });
            return;
        }
        self.streams = _.without(self.streams, stream);
    };

    self.beforeSave = function () {
        self.disableForm = true;
    };

    self.save = function () {
        if (self.streams.length === 0) {
            $alert({
                content: 'You must have at least one stream.',
                type: 'danger',
                duration: 5
            });
            self.disableForm = false;
            return $q.reject();
        }

        if (self.streams.length > 3) {
            $alert({
                content: 'You cannot have more than 3 streams.',
                type: 'danger',
                duration: 5
            });
            self.disableForm = false;
            return $q.reject();
        }

        if (_.where(self.streams, { primary: true }).length === 0) {
            $alert({
                content: 'You must have one primary stream.',
                type: 'danger',
                duration: 5
            });
            self.disableForm = false;
            return $q.reject();
        }

        if (_.where(self.streams, { primary: true }).length > 1) {
            $alert({
                content: 'You must have only one primary stream.',
                type: 'danger',
                duration: 5
            });
            self.disableForm = false;
            return $q.reject();
        }

        if ($scope.editableForm.$invalid) {
            $alert({
                content: 'You have not filled in the form correctly.',
                type: 'danger',
                duration: 5
            });
            self.disableForm = false;
            return $q.reject();
        }

        return StreamsService.saveConfig(self.streams).then(function onSuccess () {
            $alert({
                content: 'Successfully saved your stream config.',
                type: 'success',
                duration: 3
            });
            $scope.invalidateCache();
            self.disableForm = false;
        }, function onFail () {
            $alert({
                content: 'Failed to save the new config. Your stream config was not saved. Please try again.',
                type: 'danger',
                duration: 5
            });
            self.disableForm = false;
        });
    };

    var _streams;
    self.onEdit = function () {
        _streams = angular.copy(self.streams);
    };
    self.onCancel = function () {
        self.streams = angular.copy(_streams);
    };
});
