/**
 * sofa-cross-sales-service - v0.1.0 - Fri Mar 20 2015 17:35:25 GMT+0100 (CET)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (sofa, document, undefined) {
'use strict';
/* global sofa */
/**
 * @sofadoc class
 * @name sofa.CrssSalesService
 * @package sofa-cross-sales-service
 * @distFile dist/sofaCrossSales.js
 *
 * @description
 */
sofa.define('sofa.CrossSalesService', function (configService, httpService, storageService) {

    var self = {},
        TRACK_ENDPOINT = configService.get('checkoutEndpoint') + '/tracking/user/',
        RECOMMENDATIONS_ENDPOINT = configService.get('checkoutEndpoint') + '/recommendations/?history=';

    /**
     * @sofadoc method
     * @name sofa.CrossSalesService#trackProductView
     * @memberof sofa.CrossSalesService
     *
     * @description
     * Notifies the backend when a user visits a product and adds the product id
     * to the history of visited products.
     *
     * @example
     * crossSalesService.trackProductView(userId, productId);
     *
     * @param {string} userId Id of a user or random string if not available
     * @param {string} productId Id of the product the user is visiting
     *
     * @return {object|Promise} A promise that resolves
     */
    self.trackProductView = function (userId, productId) {
        var productIdHistory = storageService.get('PRODUCT_ID_HISTORY');

        if (!productIdHistory) {
            productIdHistory = [];
        }

        productIdHistory.push(productId);
        storageService.set('PRODUCT_ID_HISTORY', productIdHistory);

        return httpService({
            method: 'POST',
            url: TRACK_ENDPOINT + userId + '/productview/' + productId
        }).then(function (response) {
            return response.data;
        });
    };

    /**
     * @sofadoc method
     * @name sofa.CrossSalesService#getRecommendedProductIds
     * @memberof sofa.CrossSalesService
     *
     * @description
     *
     * @example
     * crossSalesService.getRecommendedProductIds(productIds);
     *
     * @param {string} productIds   Array of last seen product IDs
     * @param {string} count        optional number of displayed products
     *
     * @return {object|Promise} A promise that resolves the recommended product IDs
     */
    self.getRecommendedProductIds = function (productIds, count) {
        var historyString = productIds.join(','),
            countString = '';
    
        if(count !== null) {
            countString = '&count=' + count;
        }
    
        return httpService({
            method: 'GET',
            url: RECOMMENDATIONS_ENDPOINT + historyString + countString
        }).then(function (response) {
            return response.data;
        });
    };

    return self;
});
}(sofa, document));
