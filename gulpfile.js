require('shared-sofa-component-tasks')(require('gulp'), {
    pkg: require('./package.json'),
    baseDir: __dirname,
    testDependencyFiles: [
        'node_modules/sofa-testing/mocks/sofa.config.mock.js',
        'node_modules/sofa-testing/mocks/sofa.httpService.mock.js',
        'node_modules/sofa-q-service/dist/sofa.qService.js',
        'node_modules/sofa-storages/src/sofa.memoryStorageService.js'
    ]
});
