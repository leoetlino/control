angular.module('control.manage.cast').directive('link', function () {
    return function (scope, element, attr) {
        attr.$observe('link', function (linkHref) {
            element.text(linkHref.replace(/^https?:\/\//, ''));
            element.prop('href', linkHref);
        });
    };
});
