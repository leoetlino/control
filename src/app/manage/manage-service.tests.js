/* global describe, module, inject, it, expect, beforeEach, jasmine */

describe('ManageService', function () {

    beforeEach(module('control'));
    beforeEach(module(function ($provide) {
        $provide.value('USER_ROLES', {
            all: '*',
            admin: 'admin',
            user: 'user',
            public: 'public'
        });
    }));

    var service;
    var $routeSegmentProvider;

    beforeEach(inject(function (ManageService, _$routeSegmentProvider_) {
        if (!service) {
            service = ManageService;
        }
        if (!$routeSegmentProvider) {
            $routeSegmentProvider = _$routeSegmentProvider_;
        }
    }));

    describe('the service', function () {

        it('should provide a addSection method', function () {
            expect(service.addSection).toEqual(jasmine.any(Function));
        });

        it('should provide a addItem method', function () {
            expect(service.addItem).toEqual(jasmine.any(Function));
        });

        it('should provide a getSections method', function () {
            expect(service.getSections).toEqual(jasmine.any(Function));
        });

        it('should not leak the internal list of sections', function () {
            expect(service.sections).toBeUndefined();
        });

    });

    describe('getSections', function () {

        var sections;

        it('should return an array of sections', function () {
            sections = service.getSections();
            expect(sections).toEqual(jasmine.any(Array), 'as it is a list of sections');
        });

    });

    describe('addSection', function () {

        it('should add a section when passed a valid section object', function () {
            var oldLength = service.getSections().length;
            service.addSection({
                id: 'test-section',
                name: 'Test Section'
            });
            expect(service.getSections().length).toBe(oldLength + 1, 'as we have added one section');
            var section = _.findWhere(service.getSections(), { id: 'test-section' });
            expect(section).toEqual(jasmine.any(Object));
            expect(section.id).toBe('test-section');
        });

        it('should throw an error when no section object is passed', function () {
            expect(function () { service.addSection(); }).toThrow();
        });

        it('should throw an error when the section object has no ID', function () {
            expect(function () { service.addSection({ name: 'test2' }); }).toThrow();
        });

    });

    describe('addItem', function () {

        it('should add an item when passed a valid item object', function () {
            var section = _.findWhere(service.getSections(), { id: 'test-section' });
            expect(section.items.length).toBe(0, 'as we haven\'t added any item yet');
            service.addItem({
                sectionId: 'test-section',
                name: 'A test item',
                route: {
                    subPathName: 'test-item',
                    name: 'testItem',
                    template: '/does-not-exist.html',
                    controller: 'NotExistingCtrl',
                    title: 'A test item'
                }
            });
            section = _.findWhere(service.getSections(), { id: 'test-section' });
            expect(section.items.length).toBe(1, 'as we just added exactly one item');
            expect(section.items[0].name).toBe('A test item');
        });

        it('should add a route for any item added', function () {
            expect($routeSegmentProvider.segments.manage.children.testItem).toBeDefined();
        });

        it('should throw an error when no item object is passed', function () {
            expect(function () { service.addItem(); }).toThrow();
        });

        it('should throw an error when the item object has no route object', function () {
            expect(function () { service.addItem({ name: 'test-item' }); }).toThrow();
        });

    });

});