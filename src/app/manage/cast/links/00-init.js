angular.module('control.manage.cast').run(function (ManageService) {
    ManageService.addItem({
        sectionId: 'cast',
        name: 'Links',
        icon: 'link',
        order: 3,
        route: {
            subPathName: 'links',
            name: 'links',
            template: '/app/manage/cast/links/links.html',
            controller: 'LinksCtrl',
            title: 'Links'
        }
    });
});
