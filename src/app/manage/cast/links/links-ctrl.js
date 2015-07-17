angular.module('control.manage.cast').controller('LinksCtrl', function (config) {
    var self = this;
    self.config = config;
    self.primaryStream = _.findWhere(config.streams, { primary: true }).stream;
});
