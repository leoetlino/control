import "./legacy/css/shoutca-st.css";
import "./legacy/css/animations.css";
import "./legacy/css/branding.css";
import "./legacy/css/components.css";
import "./legacy/css/fixes.css";
import "./legacy/css/helpers.css";
import "./legacy/css/loading-bar.css";
import "./legacy/css/loading-bar-green.css";
import "./legacy/css/spinner.css";

import {
    angular,
    angularRoute,
    angularAnimate,
    angularSanitize,
    angularMessages,
    angularFormly,
    angularFormlyTemplatesBootstrap,
    angularLoadingBar,
    angularSmartTable,
} from "./vendor";

import config from "./config";
import configForms from "./config-forms";
import configHttp from "./config-http";
import configAngularStrap from "./config-angular-strap";

import controlCommon from "./common";
import controlLogin from "./login";
import controlDashboard from "./dashboard";
import controlFeedback from "./feedback";
import controlManage from "./manage";

const app = angular.module("control", [
  config,
  controlCommon,
  controlLogin,
  controlDashboard,
  controlFeedback,
  controlManage,
  "angular-promise-cache",
  angularRoute,
  "route-segment",
  "view-segment",
  angularAnimate,
  angularSanitize,
  angularMessages,
  angularLoadingBar,
  "feature-flags",
  "LocalStorageModule",
  "mgcrea.ngStrap",
  "picardy.fontawesome",
  angularFormly,
  angularFormlyTemplatesBootstrap,
  angularSmartTable,
  "ngFileUpload",
  "colorpicker.module",
  "toggle-switch",
  "ui.bootstrap.showErrors",
  "angularResizable",
  "xeditable",
  "ui.select",
]);

app.config(configHttp);
app.config(configAngularStrap);
app.run(configForms);

if (IS_PRODUCTION) {
  require("./config-production").default(app);
}

angular.bootstrap(document, ["control"], { strictDi: true });
