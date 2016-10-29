export default class TunesService {
    /*@ngInject*/
  constructor($http, $rootScope, ENV) {
    const username = $rootScope.service.username;
    this.getNumberOfPages = () => {
      return $http.get(`${ENV.apiEndpoint}/control/cast/tunes/get-songs-pages/${username}`, { username }).then(resp => resp.data);
    };
    this.getSongsOnPage = (sort, page) => {
      return $http.get(`${ENV.apiEndpoint}/control/cast/tunes/get-songs/${username}/${sort}/${page}`).then(resp => resp.data);
    };
    this.deleteSong = (id) => {
      return $http.delete(`${ENV.apiEndpoint}/control/cast/tunes/song/${username}/${id}`).then(resp => resp.data);
    };
    this.updateSong = (song) => {
      return $http.post(`${ENV.apiEndpoint}/control/cast/tunes/song/${username}/${song._id}`, song).then(resp => resp.data);
    };
    this.setTags = (song, tags) => {
      return $http.post(`${ENV.apiEndpoint}/control/cast/tunes/set-tags/${username}/${song._id}`, tags).then(resp => resp.data);
    };
  }
}
