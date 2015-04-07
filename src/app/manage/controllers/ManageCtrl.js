define(['control'], function (control) {
    control.controller('ManageCtrl', function (service, $rootScope, $scope) {
        $scope.product = service;
        $scope.isInactive = function (product) {
            return (['Terminated', 'Suspended', 'Cancelled', 'Pending'].indexOf(product.status) > -1);
        };
        $scope.isStreamingServer = function (product) {
            return (product.group.toLowerCase().indexOf('cast') !== -1);
        };
    });
});
