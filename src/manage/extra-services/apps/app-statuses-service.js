export default class AppStatusesService {
    /*@ngInject*/
    constructor($http) {
      this.getStatuses = () => {
        return $http.get(
                "https://apps.shoutca.st/internal/statuses",
                { cache: true }
            ).then(res => res.data);
      };
      this.getStatusesByValue = () => {
        return $http.get(
                "https://apps.shoutca.st/internal/statuses-by-value",
                { cache: true }
            ).then(res => res.data);
      };
    }
}
