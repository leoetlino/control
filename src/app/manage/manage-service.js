control.factory('ManageService', function ($routeSegmentProvider, USER_ROLES) {
    var sections = [];
    var instance = {
        getSections: function (doNotSort) {
            if (doNotSort) {
                return sections;
            }

            sections.forEach(function (section) {
                section.items = _.sortBy(section.items, 'order');
            });

            return _.sortBy(sections, 'order');
        },
        removeAllSections: function () {
            sections = [];
            return sections;
        },
        removeSection: function (sectionSelector) {
            if (typeof sectionSelector === 'undefined') {
                throw new TypeError('No section selector was passed');
            }
            var section = _.findWhere(sections, sectionSelector);
            if (!section) {
                throw new Error('Could not find any section matching the selector: ' + sectionSelector);
            }
            sections = _.without(sections, section);
        },
        removeAllItems: function (sectionSelector) {
            if (typeof sectionSelector === 'undefined') {
                throw new TypeError('No section selector was passed');
            }
            var section = _.findWhere(sections, sectionSelector);
            if (!section) {
                throw new Error('Could not find any section matching the selector: ' + sectionSelector);
            }
            section.items = [];
        },
        addSection: function (section) {
            if (typeof section === 'undefined') {
                throw new TypeError('No section object was passed');
            }

            if (!section.id) {
                throw new Error('The section object must contain an `id`');
            }

            sections.push({
                id: section.id,
                name: section.name,
                icon: section.icon,
                order: section.order,
                items: [],
                visibleForCastOnly: section.visibleForCastOnly || false
            });
        },
        addItem: function (item) {
            if (typeof item === 'undefined') {
                throw new TypeError('No item object was passed');
            }

            if (!item.name) {
                throw new Error('The section object must contain a `name`');
            }

            if (!item.route) {
                throw new Error('The section object must contain a `route` object');
            }

            var newItem = {
                name: item.name,
                icon: item.icon,
                visibleForCastOnly: item.visibleForCastOnly || false,
                order: item.order,
                route: {
                    subPathName: item.route.subPathName,
                    name: item.route.name,
                    completeName: 'manage.' + item.route.name,
                    template: item.route.template,
                    controller: item.route.controller,
                    title: item.route.title
                }
            };
            var section = _.findWhere(sections, { id: item.sectionId });
            if (!section) {
                throw new Error('Could not find associated section: ' + item.sectionId);
            }

            section.items.push(newItem);

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
    window.manager = instance;
    return instance;
});
