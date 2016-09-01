export default /*@ngInject*/ function () {
  this.getClocks = () => new Promise((resolve) => {
    resolve([{
      "username": "swiftly",
      "tags": [
        {
          "percent": 100,
          "tag": "song",
        },
      ],
      "start": {
        "dayOfWeek": 1,
        "hour": 0,
        "minute": 0,
      },
      "end": {
        "dayOfWeek": 7,
        "hour": 23,
        "minute": 59,
      },
    }]);
  });
}
