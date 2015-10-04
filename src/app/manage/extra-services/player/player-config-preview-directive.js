angular.module('control.manage.extra-services').directive('playerConfigPreview', () => {
    return (scope, element, attr) => {
        scope.$watch(attr.config, (newValue, oldValue) => {
            if (angular.equals(newValue, oldValue)) {
                return;
            }
            element[0].contentWindow
                .postMessage({ type: 'reloadConfig', config: newValue }, 'https://player.shoutca.st');
        }, true);
    };
});
