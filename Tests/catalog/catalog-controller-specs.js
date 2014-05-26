"use strict";

describe('CatalogController', function () {
    var scope, mockCatalogRepository, mockRegistrationService;
    var catalog = [{foo: 'bar'}];

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, CatalogRepository, RegistrationService) {
            scope = $rootScope.$new();

            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockCatalogRepository.getCatalog.returns(catalog);

            mockRegistrationService = sinon.stub(RegistrationService);

            $controller("CatalogController", { $scope: scope, CatalogRepository: mockCatalogRepository  });
        });
    });

    describe('when the controller first loads', function () {
        it('should retrieve the course catalog', function () {
            expect(mockCatalogRepository.getCatalog.called).toBeTruthy();
        });
        it('should put the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog)
        });
    });

    describe('when registering for a class', function() {
        var courseId = 'DDA302';
        var response = {success: true, message: ''};

        beforeEach(function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
        });

        it('should add the class to the wizard\'s schedule', function() {
            expect(mockRegistrationService.register.calledWith(courseId)).toBeTruthy();
        });
        it('should add the registration response to the scope', function() {
            expect(scope.response).toEqual(response);
        });
    });

});
