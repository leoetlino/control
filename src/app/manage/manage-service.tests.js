/* global describe, module, inject, it, expect, beforeEach, spyOn, jasmine */

describe('ManageService', function () {

    var fakeLocation = {};
    var ManageService;
    var $rootScope;
    var $httpBackend;
    var services = [];

    beforeEach(module('control'));
    beforeEach(module(function ($provide) {
        $provide.value('ENV', { apiEndpoint: 'itframe.shoutca.st' });
        $provide.value('$location', {
            search: function () {
                return fakeLocation;
            }
        });
    }));
    beforeEach(inject(function (_$rootScope_, _ManageService_, _$httpBackend_) {
        ManageService = _ManageService_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        if (services.length) {
            ManageService.setServices(services);
        }
        spyOn($rootScope, '$broadcast');
    }));

    describe('the service', function () {

        it('should provide a invalidateCache method', function () {
            expect(ManageService.invalidateCache).toEqual(jasmine.any(Function));
        });

        it('should provide a initAndGetService method', function () {
            expect(ManageService.initAndGetService).toEqual(jasmine.any(Function));
        });

        it('should provide a initAndGetServices method', function () {
            expect(ManageService.initAndGetServices).toEqual(jasmine.any(Function));
        });

        it('should provide a getServicesPromise method', function () {
            expect(ManageService.getServicesPromise).toEqual(jasmine.any(Function));
        });

        it('should provide a getServicesList method', function () {
            expect(ManageService.getServicesList).toEqual(jasmine.any(Function));
        });

        it('should provide a getSelectedService method', function () {
            expect(ManageService.getSelectedService).toEqual(jasmine.any(Function));
        });

        it('should provide a getBy method', function () {
            expect(ManageService.getBy).toEqual(jasmine.any(Function));
        });

        it('should provide a setServices method', function () {
            expect(ManageService.setServices).toEqual(jasmine.any(Function));
        });

        it('should not leak the cached list of services', function () {
            expect(ManageService.cachedServices).toBeUndefined();
        });

    });

    describe('getServicesPromise', function () {

        it('should return a promise and succeed', function () {
            var testResponse = [
                {
                    id: '0001',
                    name: 'xxx',
                    group: 'Cast 1.0 Nodes',
                    server: 'xxx',
                    status: 'Active',
                    username: 'testing',
                    price: '0.00',
                    isReseller: false,
                    tuneinIntegration: { isEnabled: false },
                    nowPlaying: { isEnabled: false },
                    apps: {}
                },
                {
                    id: '0002',
                    name: 'xxx',
                    group: 'Imaginary License',
                    server: 'xxx',
                    status: 'Active',
                    username: 'xxx',
                    price: '999.99',
                    isReseller: false,
                    tuneinIntegration: { isEnabled: false },
                    nowPlaying: { isEnabled: false },
                    apps: {}
                },
                {
                    id: '0003',
                    name: 'xxx',
                    group: 'Cast Nodes',
                    server: 'xxx',
                    status: 'Suspended',
                    username: 'xxx',
                    price: '0.00',
                    isReseller: false,
                    tuneinIntegration: { isEnabled: false },
                    nowPlaying: { isEnabled: false },
                    apps: {}
                },
                {
                    id: '0004',
                    name: 'Free',
                    group: 'Cast Nodes',
                    server: 'xxx',
                    status: 'Active',
                    username: 'xxx',
                    price: '0.00',
                    isReseller: false,
                    tuneinIntegration: { isEnabled: false },
                    nowPlaying: { isEnabled: false },
                    apps: {}
                },
                {
                    id: '0005',
                    name: 'Unlimited',
                    group: 'Cast Nodes',
                    server: 'xxx',
                    status: 'Active',
                    username: 'cast',
                    price: '5.00',
                    isReseller: false,
                    tuneinIntegration: { isEnabled: false },
                    nowPlaying: { isEnabled: false },
                    apps: {}
                }
            ];

            $httpBackend.expectPOST('https://itframe.shoutca.st/control/accounts/').respond(200, testResponse);

            ManageService.getServicesPromise().then(function (_services_) {
                services = _services_;
            });

            $httpBackend.flush();
            $rootScope.$digest();
            expect(services).toBeDefined();
        });

    });

    var filteredServices;

    describe('getServicesList', function () {

        it('should return an array of services', function () {
            filteredServices = ManageService.getServicesList();
            expect(filteredServices).toEqual(jasmine.any(Array));
        });

        it('should only return services eligible to Control', function () {
            // We faked 5 services, 2 eligible, 3 uneligible.
            // Check that we only get back the two eligible services.
            expect(filteredServices.length).toBe(2);
        });

    });

    describe('getBy', function () {

        it('should return the correct service if it exists', function () {
            var aService = ManageService.getBy('id', '0001');
            expect(aService).toBeDefined();
            expect(aService.id).toBe('0001');

            var anotherService = ManageService.getBy('username', 'testing');
            expect(anotherService).toBeDefined();
            // Plot twist: it's the same service as `aService`.
            expect(anotherService.id).toBe('0001');
            expect(anotherService.username).toBe('testing');

            var yetAnotherService = ManageService.getBy('username', 'cast');
            expect(yetAnotherService).toBeDefined();
            expect(yetAnotherService.id).toBe('0005');
            expect(yetAnotherService.username).toBe('cast');
        });

        it('should return undefined otherwise', function () {
            var service = ManageService.getBy('id', 'xxxx');
            expect(service).toBeUndefined();
        });

    });

    describe('getSelectedService', function () {

        var service;

        it('should use $location to get the pre-selected service', function () {
            fakeLocation = { username: 'testing' };
            service = ManageService.getSelectedService();
            expect(service).toBeDefined();
            expect(service.id).toBe('0001');

            fakeLocation = { username: 'cast' };
            service = ManageService.getSelectedService();
            expect(service).toBeDefined();
            expect(service.id).toBe('0005');

            fakeLocation = { serviceId: '0001' };
            service = ManageService.getSelectedService();
            expect(service).toBeDefined();
            expect(service.username).toBe('testing');

            fakeLocation = { serviceId: '0005' };
            service = ManageService.getSelectedService();
            expect(service).toBeDefined();
            expect(service.username).toBe('cast');
        });

        it('should use $rootScope to get the pre-selected service', function () {
            fakeLocation = {};
            $rootScope.service = { id: '0001' };
            service = ManageService.getSelectedService();
            expect(service).toBeDefined();
            expect(service.id).toBe('0001');

            $rootScope.service = { id: '0005' };
            service = ManageService.getSelectedService();
            expect(service).toBeDefined();
            expect(service.id).toBe('0005');
        });

        describe('its behaviour when the requested service does not exist', function () {

            it('should broadcast `invalid-service`', function () {
                fakeLocation = { serviceId: 'xxx' };
                service = ManageService.getSelectedService();
                expect($rootScope.$broadcast).toHaveBeenCalledWith('invalid-service');
            });

            it('should default to the first service', function () {
                fakeLocation = { serviceId: 'xxx' };
                service = ManageService.getSelectedService();
                expect(service.id).not.toBe('xxx');
            });

        });

        it('should return the first service by default', function () {
            fakeLocation = {};

            service = ManageService.getSelectedService();
            expect(service).toBeDefined();
        });

    });

});
