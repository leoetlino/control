control.factory('ManageService', function ($routeSegmentProvider, USER_ROLES) {
    var sections = [];
    var instance = {
        getSections: function () {
            return sections;
        },
        addSection: function (section) {
            sections.push({
                name: section.name,
                icon: section.icon,
                items: []
            });
        },
        addItem: function (item) {
            var newItem = {
                name: item.name,
                icon: item.icon,
                route: {
                    subPathName: item.route.subPathName,
                    name: item.route.name,
                    completeName: 'manage.' + item.route.name,
                    template: item.route.template,
                    controller: item.route.controller
                }
            };
            sections[item.section].items.push(newItem);

            var watchForService = ['$rootScope', function ($rootScope) {
                return $rootScope.service.id;
            }];
            $routeSegmentProvider
                .when('/manage/' + newItem.route.subPathName, newItem.route.completeName)
                .within('manage')
                .segment(newItem.route.name, {
                    templateUrl: newItem.route.template,
                    authorizedRoles: [USER_ROLES.all],
                    title: newItem.route.title,
                    controller: newItem.route.controller,
                    watcher: watchForService
                });
        }
    };
    return instance;
});
