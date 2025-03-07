const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
    target: 'http://localhost:3009',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware(proxy)
  );
}