/* global describe, module, inject, it, expect, beforeEach, jasmine */

describe('NowPlayingTweetsService', function () {

    beforeEach(module('control'));
    beforeEach(module(function ($provide) {
        $provide.value('ENV', { apiEndpoint: 'itframe.shoutca.st' });
    }));
    beforeEach(inject(function (NowPlayingTweetsService, $httpBackend) {
        this.service = NowPlayingTweetsService;
        this.$httpBackend = $httpBackend;
    }));

    describe('the service', function () {

        it('should provide a submitSettings method', function () {
            expect(this.service.submitSettings).toEqual(jasmine.any(Function));
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

    describe('submitSettings', function () {

        it('should succeed if everything is OK', function () {
            var testData = {
                username: 'test',
                prefix: '#NowPlaying',
                suffix: '',
            };
            var succeeded;

            this.$httpBackend.expectPOST('https://itframe.shoutca.st/control/now-playing/update-settings', testData).respond(200, { result: 'success' });

            this.service.submitSettings(testData.username, testData).then(function () {
                succeeded = true;
            });

            this.$httpBackend.flush();
            expect(succeeded).toBe(true);
        });

        it('should fail if the server says so', function () {
            var testData = {};
            var succeeded;

            this.$httpBackend.expectPOST('https://itframe.shoutca.st/control/now-playing/update-settings', testData).respond(500, { result: 'error', error: 'Missing data' });

            this.service.submitSettings('', testData).then(function () {
                succeeded = true;
            });

            this.$httpBackend.flush();
            expect(succeeded).not.toBe(true);
        });

    });

});
