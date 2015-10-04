/* global describe, module, inject, it, expect, beforeEach, jasmine */

describe('PlayerService', function () {

    beforeEach(module('control'));
    beforeEach(module(function ($provide) {
        $provide.value('ENV', { apiEndpoint: 'itframe.innovatete.ch' });
    }));
    beforeEach(inject(function (TuneInIntegrationService, $httpBackend) {
        this.service = TuneInIntegrationService;
        this.$httpBackend = $httpBackend;
    }));

    describe('the service', function () {

        it('should provide a getSettings method', function () {
            expect(this.service.getSettings).toEqual(jasmine.any(Function));
        });

        it('should provide a saveSettings method', function () {
            expect(this.service.saveSettings).toEqual(jasmine.any(Function));
        });

        it('should provide a removeSettings method', function () {
            expect(this.service.removeSettings).toEqual(jasmine.any(Function));
        });
    });

});
