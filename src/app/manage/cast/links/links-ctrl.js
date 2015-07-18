angular.module('control.manage.cast').controller('LinksCtrl', function (config) {
    var self = this;
    self.config = angular.copy(config);
    self.primaryStream = _.findWhere(config.streams, { primary: true }).stream;
});
