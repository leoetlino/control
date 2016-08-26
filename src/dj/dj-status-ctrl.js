import { lodash as _ } from "../vendor";

export default /*@ngInject*/ function ($scope, $alert, config, DjConfigService) {
  this.disableForm = false;
  const disableForm = () => this.disableForm = true;
  const enableForm = () => this.disableForm = false;

  this.config = _.clone(config);

  const watchEnabled = () => {
    let unwatch = $scope.$watch(() => this.config.enabled, (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }
      disableForm();
      DjConfigService.updateConfig({ enabled: newValue }).then(enableForm, (response) => {
        unwatch();
        this.config.enabled = !newValue;
        watchEnabled();
        enableForm();
        $alert({
          content: `Failed to ${newValue ? "enable" : "disable"} DJ: ${response.data.error}`,
          type: "danger",
        });
      });
    });
  };
  watchEnabled();
}
