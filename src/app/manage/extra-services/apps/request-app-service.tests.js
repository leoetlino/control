/* global describe, module, inject, it, expect, beforeEach, jasmine */

describe('RequestAppService', function () {

    beforeEach(module('control'));
    beforeEach(module(function ($provide) {
        $provide.value('ENV', { apiEndpoint: 'itframe.innovatete.ch' });
    }));
    beforeEach(inject(function (RequestAppService) {
        this.service = RequestAppService;
    }));

    describe('the service', function () {

        it('should provide a submit method', function () {
            expect(this.service.submit).toEqual(jasmine.any(Function));
        });
        it('should provide a update method', function () {
            expect(this.service.update).toEqual(jasmine.any(Function));
        });
        it('should provide a getAppsObject method', function () {
            expect(this.service.getAppsObject).toEqual(jasmine.any(Function));
        });
        it('should provide a getRequest method', function () {
            expect(this.service.getRequest).toEqual(jasmine.any(Function));
        });
        it('should provide a getResizedImageDataUrl method', function () {
            expect(this.service.getResizedImageDataUrl).toEqual(jasmine.any(Function));
        });
        it('should provide a getSanitisedApp method', function () {
            expect(this.service.getSanitisedApp).toEqual(jasmine.any(Function));
        });
        it('should provide a getSafeAppName method', function () {
            expect(this.service.getSafeAppName).toEqual(jasmine.any(Function));
        });

    });

});
