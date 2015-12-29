export default class DirectoriesService {
    /*@ngInject*/
    constructor ($http, ENV, promiseCache, $rootScope) {
        this.getChoices = () => promiseCache({
            promise: () => {
                return $http
                    .get(ENV.apiEndpoint + '/control/cast/directories/get-supported')
                    .then(response => response.data);
            },
            ttl: -1,
        });

        this.enableDirectory = (directory) => {
            var username = $rootScope.service.username;
            return $http.post(
                ENV.apiEndpoint + '/control/cast/directories/enable/' + username,
                { directory }
            );
        };

        this.disableDirectory = (directory) => {
            var username = $rootScope.service.username;
            return $http.post(
                ENV.apiEndpoint + '/control/cast/directories/disable/' + username,
                { directory }
            );
        };
    }
}
