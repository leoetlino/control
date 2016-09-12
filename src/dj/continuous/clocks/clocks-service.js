export default /*@ngInject*/ function () {
  this.getClocks = () => new Promise((resolve) => {
    resolve([{
      "username": "swiftly",
      "name": "Week",
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
        "dayOfWeek": 5,
        "hour": 23,
        "minute": 59,
      },
    },
    {
      "username": "swiftly",
      "name": "Weekend",
      "tags": [
        {
          "percent": 100,
          "tag": "song",
        },
      ],
      "start": {
        "dayOfWeek": 6,
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
