angular.module('control.manage.cast', []).run(function (ManageService) {
    ManageService.addSection({
        name: 'Cast',
        id: 'cast',
        visibleForCastOnly: true,
    });
});
