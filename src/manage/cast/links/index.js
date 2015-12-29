import { angular } from '../../../vendor';

import LinksCtrl from './links-ctrl';
import LinkDirective from './link-directive';

export default angular.module('control.manage.cast.links', [])
    .directive('link', LinkDirective)
    .controller('LinksCtrl', LinksCtrl)
    .run(/*@ngInject*/ (ManageService) => {
        ManageService.addItem({
            sectionId: 'cast',
            name: 'Links',
            icon: 'link',
            order: 3,
            route: {
                subPathName: 'links',
                name: 'links',
                template: require('./links.html'),
                controller: 'LinksCtrl',
                controllerAs: 'ctrl',
                title: 'Links',
                resolve: /*@ngInject*/ {
                    config: (ConfigService) => ConfigService.getConfig(),
                },
            },
        });
    })
    .name;
