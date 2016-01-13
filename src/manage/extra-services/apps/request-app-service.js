import { angular, lodash as _ } from "../../../vendor";

export default /*@ngInject*/ function (
    $http,
    ENV,
    $rootScope,
    $q) {

  var RequestAppService = {
    submit: function (platform, originalRequest) {
      var request = _.clone(originalRequest);
      request.tabs = [];
      if (request.website) {
        request.tabs.push({ type: "website", value: request.website });
      }
      if (request.facebook) {
        request.tabs.push({ type: "facebook", value: request.facebook });
      }
      if (request.twitter) {
        request.tabs.push({ type: "twitter", value: request.twitter });
      }
      return $http.post(ENV.apiEndpoint + "/control/apps", {
        username: request.username,
        platform: platform,
        request: request,
      });
    },
    update: function (platform, request) {
      let requestToSend = angular.copy(request);
      let username = requestToSend.username;
      delete requestToSend.screenshots;
      return $http.put(ENV.apiEndpoint + "/control/apps/" + username, {
        username,
        platform,
        request: requestToSend,
      });
    },

    getAppsObject: function () {
      return $http
                .get(ENV.apiEndpoint + "/control/apps/" + $rootScope.service.username)
                .then(function (res) { return res.data; });
    },
    getRequest: function (platform) {
      return this.getAppsObject().then(function (apps) {
        return apps[platform];
      });
    },

    getResizedImageDataUrl: function (width, height, imageUrl) {
      var deferred = $q.defer();
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = (width) ? width : this.width;
        canvas.height = (height) ? height : this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        deferred.resolve({
          dataUrl: canvas.toDataURL("image/png"),
          resizedWidth: canvas.width,
          resizedHeight: canvas.height,
          width: this.width,
          height: this.height,
        });
      };
      img.src = "/get-image/" + btoa(imageUrl);
      return deferred.promise;
    },
    getSanitisedApp: function (app, keepScreenshots) {
      var copiedApp = angular.copy(app);
      copiedApp.tabs.forEach(function (item) {
        delete item.$$hashKey;
      });

      if (!keepScreenshots) {
        copiedApp.screenshots = null;
        delete copiedApp.screenshots;
      }

      copiedApp.type = (!copiedApp.featureGraphic) ? "iOS" : "android";

      return copiedApp;
    },
    getSafeAppName: function (app) {
      var safeAppName = app.name.replace(/[^a-z0-9]/gi, "");
      if (safeAppName === "") {
        safeAppName = app._id;
      }
      return safeAppName;
    },
  };

  return RequestAppService;

}
