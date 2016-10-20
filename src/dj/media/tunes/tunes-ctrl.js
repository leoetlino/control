export default /*@ngInject*/ function ($scope, TunesService, $rootScope) {
  this.tab = "songs";

  this.songs = [];
  this.page = 1;
  this.numberOfPages = 0;
  this.sortOn = "artist";
  this.songPlaying = null;
  this.audioThread = null;

  TunesService.getNumberOfPages().then((numberOfPages) => {
    this.numberOfPages = numberOfPages;
    this.loadSongs();
  });
  this.setTab = (tab) => {
    this.tab = tab;
  };

  this.loadSongs = () => {
    TunesService.getSongsOnPage(this.sortOn, this.page).then((data) => {
      this.songs = data;
    });
  };

  this.togglePreview = (id) => {
    if (this.songPlaying === id) {
      this.audioThread.pause();
      this.songPlaying = null;
    } else {
      if (this.songPlaying) {
        this.audioThread.pause();
      }
      this.audioThread = new Audio(`https://${$rootScope.service.username}.radioca.st/dj/preview/${id}`);
      this.audioThread.play();
      this.songPlaying = id;
    }
  };

  this.isSortedOn = (sortedOn) => {
    return this.sortOn === sortedOn || this.sortOn === "-" + sortedOn;
  };

  this.sort = (sortOn) => {
    this.sortOn = sortOn;
    this.loadSongs();
  };

  this.deleteSong = (id) => {
    TunesService.deleteSong(id).then(() => {
      this.loadSongs();
    });
  };

  $scope.getNumber = (num) => {
    return new Array(num);
  };


}
