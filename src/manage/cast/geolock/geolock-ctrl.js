import { angular, lodash as _ } from "../../../vendor";

export default /*@ngInject*/ function (
    $alert,
    $http,
    $scope,
    ConfigService,
    AboutService,
    config,
    countries
) {
  const FIRST_SUPPORTED_REV = "1fc60531f11343f8046ed757d6f908a3a5a3a0dc";
  const CURRENT_CAST_REV = config.version.Cast;
  AboutService.getCastBuildInfo().then(({ version }) => {
    if (CURRENT_CAST_REV !== version && CURRENT_CAST_REV !== FIRST_SUPPORTED_REV) {
      $alert({
        type: "info",
        content: "If GeoLock does not work correctly, please try updating Cast from the About page.",
      });
    }
  });


  this.countries = countries;

  this.serverSettings = config.geolock || { enabled: false }; // settings saved server-side
  this.settings = _.clone(this.serverSettings); // settings that can be changed
    // The server only stores country codes, whereas the UI needs full country objects
    // to show the country names correctly. Try to match country codes with countries.
  this.settings.countries = (this.settings.countryCodes || []).map(countryAlpha2 => {
    return this.countries.find(country => country["alpha-2"] === countryAlpha2);
  });

  this.disableForm = false;

  this.getCountryName = (country) => country.name;
  this.areSettingsValid = () => {
    return ["blacklist", "whitelist"].includes(this.settings.mode)
            && Array.isArray(this.settings.countries)
            && this.settings.countries.length;
  };
  this.areServerSettingsValid = () => {
    return ["blacklist", "whitelist"].includes(this.serverSettings.mode)
            && Array.isArray(this.serverSettings.countryCodes)
            && this.serverSettings.countryCodes.length;
  };
  this.areSettingsSaved = () => {
    return angular.equals(this.serverSettings, prepareSettingsToSave(this.settings));
  };

  this.saveSettings = () => {
    let settings = prepareSettingsToSave(this.settings);
    disableForm();
    return ConfigService.saveGeoLockConfig(settings).then(() => {
      notifyAndEnableForm({
        message: "Successfully updated the configuration.",
        type: "success",
        duration: 3,
      });
      this.serverSettings = settings;
    }, (resp) => notifyAndEnableForm({
      message: `Failed to update the configuration: ${resp.data.error}`,
      type: "danger",
    }));
  };

  this.removeSettings = () => {
    this.settings = { enabled: false };
    return this.saveSettings();
  };

  $scope.$watch(() => this.settings.enabled, (isEnabled, wasEnabled) => {
    if (isEnabled !== wasEnabled
            && this.areSettingsValid(this.settings)
            && this.areSettingsValid(this.serverSettings)) {
      this.saveSettings();
    }
  });

  let prepareSettingsToSave = (settingsToSave) => {
    let settings = _.clone(settingsToSave);
    settings.countryCodes = (settings.countries || []).map(country => country["alpha-2"]);
    delete settings.countries;
    return settings;
  };
  let disableForm = () => this.disableForm = true;
  let enableForm = () => this.disableForm = false;
  let notifyAndEnableForm = ({ message, type = "info", duration }) => {
    $alert({
      content: message,
      type,
      duration,
    });
    $scope.$emit("invalidate-cast-config-cache");
    enableForm();
  };
}
