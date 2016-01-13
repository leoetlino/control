export default class FeedbackService {
    /*@ngInject*/
    constructor($http, ENV) {
      this.send = (subject, message) => {
        return $http.post(ENV.apiEndpoint + "/control/feedback", {
          subject,
          message,
        });
      };
    }
}
