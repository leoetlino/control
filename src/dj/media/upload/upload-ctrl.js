export default /*@ngInject*/ function ($scope, FileUploader, ENV, localStorageService, $rootScope) {
  $scope.uploader = new FileUploader({
    url: ENV.apiEndpoint + "/control/cast/tunes/upload",
    alias: "song",
    removeAfterUpload: false,
    formData: [
      { username: $rootScope.service.username },
    ],
    headers: {
      Authorization: "Bearer " + localStorageService.get("sessionData").token,
    },
  });
}
