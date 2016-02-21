export /*@ngInject*/ function appStatus(AppStatusesService) {
  var statuses;
  var filterFn;
  filterFn = function (input) { return input; };
  AppStatusesService.getStatusesByValue().then(function (data) {
    statuses = data;
    filterFn = function (input) { return statuses[input]; };
  });
  var wrapperFn = function wrapper(input) {
    return filterFn(input);
  };
  wrapperFn.$stateful = true;
  return wrapperFn;
}

export /*@ngInject*/ function appStatusExplanation() {
  return function (input, platform) {
    var identifier = platform + "." + input;
    switch (identifier) {
      case "iOS.pending":
      case "android.pending":
        return "Your app is pending. It will be submitted soon.";
      case "iOS.pendingUpdate":
      case "android.pendingUpdate":
        return "Your app is pending update. Its update will be submitted soon.";
      case "iOS.inProgress":
        return "Your app is currently being worked on.";
      case "android.inProgress":
        return "Your app is currently being submitted to the Play Store.";
      case "iOS.submitted":
        return "Your app has been submitted to the App Store. It is now pending review from Apple and will be available in about one week (if it gets approved).";
      case "android.submitted":
        return "Your app has been submitted to the Play Store.";
      case "iOS.submittedUpdate":
        return "Your app update has been submitted to the App Store. It is now pending review from Apple and will be available in about one week (if it gets approved).";
      case "android.submittedUpdate":
        return "Your app update has been submitted to the Play Store.";
      case "iOS.approved":
        return "Your app has been approved by Apple and will be available within 24 hours.";
      case "iOS.approvedUpdate":
        return "Your app update has been approved by Apple and will be available within 24 hours.";
      case "iOS.onHold":
      case "android.onHold":
        return "Your app request was rejected by our team.";
      case "android.rejectedByGoogle":
        return "Your app request has some issues and was rejected by Google. Please contact support to resolve this situation.";
      case "iOS.rejectedByGoogle":
        return "This doesn't make any sense. Please contact support.";
      case "iOS.rejectedByApple":
        return "Your app request has some issues and was rejected by Apple. Please contact support to resolve this situation.";
      case "android.rejectedByApple":
        return "This doesn't make any sense. Please contact support.";
      default:
        return "For more details, please contact support.";
    }
  };
}
