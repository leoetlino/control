/* global describe, module, inject, it, expect, beforeEach, jasmine */

describe('RequestAppService', function () {

    beforeEach(module('control'));
    beforeEach(module(function ($provide) {
        $provide.value('ENV', { apiEndpoint: 'itframe.innovatete.ch' });
    }));
    beforeEach(inject(function (RequestAppService, $httpBackend) {
        this.service = RequestAppService;
        this.$httpBackend = $httpBackend;
    }));

    describe('the service', function () {

        it('should provide a submit method', function () {
            expect(this.service.submit).toEqual(jasmine.any(Function));
        });

    });

});
