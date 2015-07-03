define(['control'], function (control) {
    control.filter('appStatus', function (AppStatusesService) {
        var statuses, filterFn;
        filterFn = function (input) { return input; };
        AppStatusesService.getStatusesByValue().then(function (data) {
            statuses = data;
            filterFn = function (input) { return statuses[input]; };
        });
        var wrapperFn = function wrapper (input) {
            return filterFn(input);
        };
        wrapperFn.$stateful = true;
        return wrapperFn;
    });

    control.filter('appStatusRow', function () {
        return function (input) {
            switch (input) {
                case 'pending':
                case 'pendingUpdate': return 'warning';
                case 'inProgress': return 'info';
                case 'submitted':
                case 'submittedUpdate':
                case 'approved':
                case 'approvedUpdate': return 'success';
            }
        };
    });

    control.filter('appStatusExplanation', function () {
        return function (input) {
            switch (input) {
                case 'pending': return 'Your app is pending. It will be submitted soon.';
                case 'pendingUpdate': return 'Your app is pending update. Its update will be submitted soon.';
                case 'inProgress': return 'Your app is currently being submitted.';
                case 'submitted': return 'Your app has been submitted to the store.';
                case 'submittedUpdate': return 'Your app update has been submitted to the store.';
                case 'approved': return 'Your app has been approved.';
                case 'approvedUpdate': return 'Your app update has been approved';
                case 'onHold': return 'Your app request has some issues. Please contact support to resolve this situation.';
                case 'rejectedByGoogle': return 'Your app request has some issues and was rejected by Google. Please contact support to resolve this situation.';
                case 'rejectedByApple': return 'Your app request has some issues and was rejected by Apple. Please contact support to resolve this situation.';
            }
        };
    });
});
