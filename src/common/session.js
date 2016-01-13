export default class Session {
  /*@ngInject*/
  constructor (USER_ROLES, localStorageService, $rootScope) {
    Object.assign(this, { USER_ROLES, localStorageService, $rootScope });
  }

  create = (token) => {
    this.token = token;
    this.userRole = [this.USER_ROLES.user];
    this.localStorageService.set("token", token);
    this.$rootScope.$broadcast("sessionCreated");
  };

  update = (token) => {
    this.token = token;
    this.localStorageService.set("token", token);
    this.$rootScope.$broadcast("sessionUpdated");
  };

  createFromLocalStorage = () => {
    this.create(this.localStorageService.get("token"));
  };

  destroy = () => {
    this.token = null;
    this.userRole = null;
    this.localStorageService.remove("token");
    this.$rootScope.$broadcast("sessionDestroyed");
  };
}
