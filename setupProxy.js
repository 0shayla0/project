const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        'api',
        createProxyMiddleware({
            target: 'http://localhost:1337/api/lessons',
            changeOrigin: true
        })
    )
}
