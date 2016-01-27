// Import all CSS files from ./styles/
let cssContext = require.context("./styles", true, /\.css$/);
cssContext.keys().forEach(cssContext);

import { angular, angularRoute } from "../vendor";
import Session from "./auth/session";
import AuthService from "./auth/auth-service";
import AuthChecker from "./auth/auth-checker";
import { AUTH_EVENTS, USER_ROLES } from "./auth/auth-constants";
import authEventHandlers from "./auth/auth-event-handlers";
import routeEventHandlers from "./route-event-handlers";
import AuthInterceptor from "./auth/auth-interceptor";
import HttpTimeoutInterceptor from "./http-interceptors/http-timeout-interceptor";
import ServerErrorInterceptor from "./http-interceptors/server-error-interceptor";
import FormUploadCtrl from "./forms/form-upload-ctrl";
import NavigationCtrl from "./navigation-ctrl";
import SpinnerComponent from "./components/spinner-component";
import "./components/spinner.css";
import TextCollapseDirective from "./components/text-collapse-directive";
import ShowIfFeatureFlagDirective from "./components/show-if-feature-flag-directive";
import configRouting from "./config-routing";

export default angular.module("control.common", [angularRoute, "route-segment", "view-segment"])
  .service("Session", Session)
  .service("AuthService", AuthService)
  .service("AuthChecker", AuthChecker)
  .service("AuthInterceptor", AuthInterceptor)
  .service("HttpTimeoutInterceptor", HttpTimeoutInterceptor)
  .service("ServerErrorInterceptor", ServerErrorInterceptor)
  .constant("AUTH_EVENTS", AUTH_EVENTS)
  .constant("USER_ROLES", USER_ROLES)
  .run(authEventHandlers)

  .run(routeEventHandlers)
  .controller("FormUploadCtrl", FormUploadCtrl)
  .controller("NavigationCtrl", NavigationCtrl)
  .directive("showIfFeatureFlag", ShowIfFeatureFlagDirective)
  .directive("loadingSpinner", () => SpinnerComponent)
  .directive("ddTextCollapse", TextCollapseDirective)
  .config(configRouting)
  .name;
