angular.module('control.manage.cast').controller('StatisticsCtrl', function (config, StatisticsService) {
    var self = this;
    self.config = angular.copy(config);
    self.primaryStream = _.findWhere(config.streams, {
        primary: true,
    }).stream;

    self.listeners = {};

    self.updateStats = function () {
        self.config.streams.forEach(function (entry) {
            entry.failedLoading = false;
            entry.loadingStats = true;
            StatisticsService.getListeners(self.config.hostname, entry.stream, self.config.apikey).then(function onSuccess (listeners) {
                entry.loadingStats = false;
                self.listeners[entry.stream] = listeners;
            }, function onFail () {
                entry.failedLoading = true;
                entry.loadingStats = false;
            });
        });
    };
    self.updateStats();
});
