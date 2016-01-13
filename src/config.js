/* global API_ENDPOINT */
import { angular } from "./vendor";

export default angular.module("control.config", []).constant("ENV", {
  apiEndpoint: API_ENDPOINT,
}).name;
