require.config({
    baseUrl: 'script',
    paths: {
        auth: 'features/auth',
        validation: 'features/validation',
        storage: 'features/storage'
    }
});

require(['auth'], function (auth) {
    auth.init();
});
