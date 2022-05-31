const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/geoserver',
        createProxyMiddleware({
            target: 'http://103.183.113.89:8600',
            changeOrigin: true
        })
    );

    app.use(
        '/npm',
        createProxyMiddleware({
            target: 'http://quyhoach.local:84',
            changeOrigin: true
        })
    );

    app.use(
        '/images',
        createProxyMiddleware({
            target: 'http://quyhoach.local:84',
            changeOrigin: true
        })
    );

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://quyhoach.local:84',
            changeOrigin: true
        })
    );
};