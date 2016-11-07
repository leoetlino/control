export default class DjConfigService {
  /*@ngInject*/
  constructor(ConfigService, $rootScope, $http, ENV) { // The config is embedded in the Cast config.
    /**
     * Return the DJ config for the current selected Cast service.
     * @async
     * @return {Object} DJ config
     */
    this.getConfig = function () {
      return ConfigService.getConfig();
    };

    /**
     * Save the DJ config (as in PUT) and invalidate the cache
     * @param  {Object} config
     * @async
     */
    this.saveConfig = (config) => {
      const username = $rootScope.service.username;
      return $http.put(`${ENV.apiEndpoint}/control/cast/dj/${username}`, config)
        .then(this.invalidateCache);
    };

    /**
     * Update the DJ config (as in PATCH) and invalidate the cache
     * @param  {Object} config - Object with partial (or complete) DJ config
     * @async
     */
    this.updateConfig = (config) => {
      return this.getConfig().then((oldConfig) => {
        const newConfig = Object.assign({}, oldConfig, config);
        return this.saveConfig(newConfig);
      });
    };
  }
}
