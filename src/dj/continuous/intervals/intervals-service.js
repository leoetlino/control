export default /*@ngInject*/ function ($http, ENV, $rootScope) {
  this.getIntervals = () => {
    return $http.get(`${ENV.apiEndpoint}/control/cast/dj/intervals/${$rootScope.service.username}`).then(res => res.data);
  };

  this.addInterval = (data) => {
    return $http.put(`${ENV.apiEndpoint}/control/cast/dj/intervals/${$rootScope.service.username}/`, data).then(res => res.data);
  };

  this.updateInterval = (id, data) => {
    return $http.patch(`${ENV.apiEndpoint}/control/cast/dj/intervals/${$rootScope.service.username}/${id}`, data).then(res => res.data);
  };

  this.deleteInterval = (id) => {
    return $http.delete(`${ENV.apiEndpoint}/control/cast/dj/intervals/${$rootScope.service.username}/${id}`).then(res => res.data);
  };
}
