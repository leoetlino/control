define(['control'], function (control) {
    control.filter('appStatus', function () {
        return function (input) {
            switch (input) {
                case 'pending': return 'Pending';
                case 'pendingUpdate': return 'Update Pending';
                case 'inProgress': return 'In Progress';
                case 'submitted': return 'Submitted';
                case 'submittedUpdate': return 'Update Submitted';
                case 'approved': return 'Approved';
                case 'approvedUpdate': return 'Update Approved';
                case 'onHold': return 'On Hold';
                default: return 'Unknown';
            }
        };
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
            }
        };
    });
});
