angular.module('control.manage.extra-services', []).run(function (ManageService) {
    ManageService.addSection({
        name: 'Extra services',
        id: 'extra-services',
    });
});
