'use strict';
/* global sofa */

describe('sofa.CrossSalesService', function () {

    var crossSalesService,
        configService,
        q,
        storageService,
        httpService,
        TRACK_ENDPOINT,
        RECOMMENDATIONS_ENDPOINT;

    var createHttpService = function () {
        return new sofa.mocks.httpService(new sofa.QService());
    };

    beforeEach(function () {
        configService = new sofa.ConfigService();
        httpService = createHttpService();
        storageService = new sofa.MemoryStorageService();
        crossSalesService = new sofa.CrossSalesService(configService, httpService, storageService);
        q = new sofa.QService();

        TRACK_ENDPOINT = configService.get('checkoutEndpoint') + '/tracking/user/';
        RECOMMENDATIONS_ENDPOINT = configService.get('checkoutEndpoint') + '/recommendations/?history=';
    });

    it('should run tests', function () {
        expect(true).toBe(true);
    });

    describe('sofa.CrossSalesService#trackProductView', function () {

        it('should have a method trackProductView', function () {
            expect(crossSalesService.trackProductView).toBeDefined();
        });

        it('should track event for given produkt id', function (done) {

            var userId = 'someRandomId',
                productId = '20280';

            httpService.when('POST',TRACK_ENDPOINT + userId + '/productview/' + productId)
                .respond('OK');

            crossSalesService.trackProductView(userId, productId).then(function () {
                done();
            });
        });

        it('should write tracked productId into localstorage', function (done) {

            var userId = 'someRandomId',
                productId = '20280';

            httpService.when('POST',TRACK_ENDPOINT + userId + '/productview/' + productId)
                .respond('OK');

            crossSalesService.trackProductView(userId, productId).then(function () {
                expect(storageService.get('PRODUCT_ID_HISTORY')).toEqual(['20280']);
                done();
            });
        });
    });

    describe('sofa.CrossSalesService#getRecommendedProductIds', function () {

        it('should have a method getRecommendedProductIds', function () {
            expect(crossSalesService.getRecommendedProductIds).toBeDefined();
        });

        it('should return recommended products based on product history', function (done) {
            
            var historyString = ['1','2','3'];

            httpService.when('GET', RECOMMENDATIONS_ENDPOINT + historyString)
                .respond([]);

            crossSalesService.getRecommendedProductIds(historyString).then(function (productIds) {
                expect(productIds.length).toBeDefined();
                done();
            });
        });
    });
});
