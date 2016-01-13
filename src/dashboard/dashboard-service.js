export default class DashboardService {
    /*@ngInject*/
    constructor($http, ENV, promiseCache, Session, $q) {
      Object.assign(this, { $http, ENV, promiseCache, Session, $q });
    }
    getInfo() {
      if (!this.Session.token) {
        return this.$q.reject("no valid token");
      }
      return this.promiseCache({
        promise: function () {
          return this.$http.get(this.ENV.apiEndpoint + "/control/user-info")
                    .then(response => response.data);
        },
        ttl: -1,
      });
    }
}
