const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/geoserver',
        createProxyMiddleware({
            target: process.env.REACT_APP_GEOSERVER_URL,
            changeOrigin: true
        })
    );

    app.use(
        '/npm',
        createProxyMiddleware({
            target: process.env.REACT_APP_URL,
            changeOrigin: true
        })
    );

    app.use(
        '/images',
        createProxyMiddleware({
            target: process.env.REACT_APP_URL,
            changeOrigin: true
        })
    );

    app.use(
        '/admin',
        createProxyMiddleware({
            target: process.env.REACT_APP_URL,
            changeOrigin: true
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_URL,
            changeOrigin: true
        })
    );

    app.use(
        '/locales',
        createProxyMiddleware({
            target: process.env.REACT_APP_URL,
            changeOrigin: true
        })
    );
};