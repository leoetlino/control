export default /*@ngInject*/ function () {
  this.tab = "songs";

  this.songs = [];

  for (let i = 0; i <= 10; i++) {
    this.songs.push({
      "song": "10.000 Luchtballonnen",
      "artist": "K3",
      "album": "10.000 Luchtballonnen",
      "artwork": "https://photon.shoutca.st/swift.innovatete.ch/v1/AUTH_c7c69319e10b45c9b13b144831accc93/images/1537e807-c2fd-4e02-8ce4-b1537968b05c.png",
      "genre": "Kindermuziek",
      "internalURL": "",
      "tags": [
        "k3",
      ],
      "size": 12296778,
      "available": true,
      "username": "armwasmyfirstlove",
      "type": "song",
      "__v": 0,
      "duration": 219.59000000000000341,
      "bpm": 107.0379999999999967,
    });
  }

  this.setTab = (tab) => {
    this.tab = tab;
  };

}
