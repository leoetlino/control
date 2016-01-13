export default class StatisticsService {
    /*@ngInject*/
    constructor ($http) {
      this.getListeners = (hostname, stream, apiKey) => {
        return $http.get(`${hostname}/api/${stream}/${apiKey}/listeners`).then(res => res.data);
      };
    }
}
