/* global store */
angular.module('sofa.crossSalesService', [
    'sofa.core',
    store.enabled ? 'sofa.storages.localStorageService' : 'sofa.storages.memoryStorageService'
])

.factory('crossSalesService', function (configService, $http, storageService) {
    'use strict';
    return new sofa.CrossSalesService(configService, $http, storageService);
});
