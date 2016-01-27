import { angular } from "../vendor";
import LoginCtrl from "./login-ctrl";

export default angular.module("control.login", [])
    .controller("LoginCtrl", LoginCtrl)
    .config(/*@ngInject*/ ($routeSegmentProvider, $routeProvider, USER_ROLES) => {
      $routeSegmentProvider
            .when("/log-in", "login")
            .segment("login", {
              authorizedRoles: [USER_ROLES.public],
              template: require("./login.html"),
              controller: "LoginCtrl",
              title: "Log In",
            });
      $routeProvider.when("/login", { redirectTo: "/log-in" });
    })
    .name;
