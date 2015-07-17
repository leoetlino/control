angular.module('control.manage.cast').controller('StatisticsCtrl', function(config, StatisticsService, $alert) {
    var self = this;
    self.config = config;
    self.primaryStream = _.findWhere(config.streams, {
        primary: true
    }).stream;

    self.listeners = {};


    self.updateStats = function() {
        self.config.streams.forEach(function(entry) {
            StatisticsService.getListeners(self.config.hostname + '/api/' + entry.stream + '/' + self.config.apikey + '/listeners').then(function onSuccess(res) {
                self.listeners[entry.stream] = res.data;
            }, function onFail() {
                $alert({
                    content: 'Failed to get a list of your listeners. Please try again.',
                    type: 'danger',
                    duration: 5
                });
            });
        });
    };
    self.updateStats();
});
