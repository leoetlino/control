define(['control'], function (control) {
    control.controller('ManageCtrl', function ($rootScope, service) {
        $rootScope.service = service;
    });
});
