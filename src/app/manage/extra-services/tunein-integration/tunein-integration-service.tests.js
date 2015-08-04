/* global describe, module, inject, it, expect, beforeEach, jasmine */

describe('TuneInIntegrationService', function () {

    beforeEach(module('control'));
    beforeEach(module(function ($provide) {
        $provide.value('ENV', { apiEndpoint: 'itframe.shoutca.st' });
    }));
    beforeEach(inject(function (TuneInIntegrationService, $httpBackend) {
        this.service = TuneInIntegrationService;
        this.$httpBackend = $httpBackend;
    }));

    describe('the service', function () {

        it('should provide a saveSettings method', function () {
            expect(this.service.saveSettings).toEqual(jasmine.any(Function));
        });

        it('should provide a removeSettings method', function () {
            expect(this.service.removeSettings).toEqual(jasmine.any(Function));
        });

        it('should provide a enable method', function () {
            expect(this.service.enable).toEqual(jasmine.any(Function));
        });

        it('should provide a disable method', function () {
            expect(this.service.disable).toEqual(jasmine.any(Function));
        });

    });

    describe('saveSettings', function () {

        it('should succeed if everything is OK', function () {
            var testData = {
                username: 'test',
                stationId: 'xxx',
                partnerId: 'xxx',
                partnerKey: 'xxx',
            };
            var succeeded;

            this.$httpBackend.expectPOST('https://itframe.shoutca.st/control/tunein-integration/save-settings', testData).respond(200, { result: 'success' });

            this.service.saveSettings(testData.username, testData).then(function () {
                succeeded = true;
            });

            this.$httpBackend.flush();
            expect(succeeded).toBe(true);
        });

        it('should fail if the server says so', function () {
            var testData = {};
            var succeeded;

            this.$httpBackend.expectPOST('https://itframe.shoutca.st/control/tunein-integration/save-settings', testData).respond(500, { result: 'error', error: 'Missing data' });

            this.service.saveSettings('', testData).then(function () {
                succeeded = true;
            });

            this.$httpBackend.flush();
            expect(succeeded).not.toBe(true);
        });

    });

});
