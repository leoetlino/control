export default /*@ngInject*/ function ($scope, $alert, $modal, DjConfigService) {
  this.disableForm = false;
  this.genresDropdown = [
    { label: "Alternative", value: "Alternative" },
    { label: "Blues", value: "Blues" },
    { label: "Classical", value: "Classical" },
    { label: "Country", value: "Country" },
    { label: "Decades", value: "Decades" },
    { label: "Easy Listening", value: "Easy Listening" },
    { label: "Electronic", value: "Electronic" },
    { label: "Folk", value: "Folk" },
    { label: "Inspirational", value: "Inspirational" },
    { label: "Inspirational", value: "Inspirational" },
    { label: "Jazz", value: "Jazz" },
    { label: "Latin", value: "Latin" },
    { label: "Metal", value: "Metal" },
    { label: "Misc", value: "Misc" },
    { label: "New Age", value: "New Age" },
    { label: "Pop", value: "Pop" },
    { label: "Public Radio", value: "Public Radio" },
    { label: "R&B and Urban", value: "R&B and Urban" },
    { label: "Rap", value: "Rap" },
    { label: "Reggae", value: "Reggae" },
    { label: "Rock", value: "Rock" },
    { label: "Seasonal and Holiday", value: "Seasonal and Holiday" },
    { label: "Soundtracks", value: "Soundtracks" },
    { label: "Talk", value: "Talk" },
    { label: "Themes", value: "Themes" },
  ];

  DjConfigService.getConfig().then((config) => {
    this.enabled = config.DJ.enabled;
    this.config = config;
  });


  this.enableDisbale = (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    if (!newValue) {
      this.config.DJ.enabled = false;
      return DjConfigService.saveConfig(this.config);
    }

    if (!this.config.fadeLength) {
      this.config.fadeLength = 5;
    }
    $modal({ scope: $scope, template: require("./dj-settings.html"), show: true });
  };

  this.enableDJ = () => {
    this.config.DJ.enabled = true;
    DjConfigService.saveConfig(this.config);
  };

  this.disableDJ = () => {
  };

  $scope.$watch("DjStatusCtrl.enabled", this.enableDisbale);

}
