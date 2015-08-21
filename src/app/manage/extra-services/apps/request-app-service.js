angular.module('control.manage.extra-services').factory('RequestAppService', function ($http, ENV) {
    return {
        submit: function (platform, originalRequest) {
            var request = _.clone(originalRequest);
            delete request.platform;
            request.tabs = [];
            if (request.website) {
                request.tabs.push({ type: 'website', value: request.website });
            }
            if (request.facebook) {
                request.tabs.push({ type: 'facebook', value: request.facebook });
            }
            if (request.twitter) {
                request.tabs.push({ type: 'twitter', value: request.twitter });
            }
            return $http.post(ENV.apiEndpoint + '/control/apps', {
                username: request.username,
                platform: platform,
                request: request,
            });
        },
    };
});
