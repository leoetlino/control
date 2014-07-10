var services = angular.module('routeResolverServices', []);

services.provider('routeResolver', function() {

    this.$get = function() {
        return this;
    };

    this.route = function() {

        var resolve = function (baseName, title) {
            var routeDef = {};
            routeDef.templateUrl = '/app/' + baseName + '/partials/' + baseName.charAt(0).toLowerCase() + baseName.slice(1) + '.html';
            routeDef.controller = baseName.charAt(0).toUpperCase() + baseName.slice(1) + 'Ctrl';
            routeDef.title = title;
            routeDef.resolve = {
                load: ['$q', '$rootScope', function ($q, $rootScope) {
                    return resolveDependency($q, $rootScope, '/app/' + baseName + '/controllers/' + baseName.charAt(0).toUpperCase() + baseName.slice(1) + 'Ctrl.js');
                }]
            };

            return routeDef;
        },

            resolveDependency = function ($q, $rootScope, dependency) {
                var defer = $q.defer();
                require([dependency], function () {
                    defer.resolve();
                    $rootScope.$apply();
                });

                return defer.promise;
            };

        return {
            resolve: resolve
        };
    };
});
