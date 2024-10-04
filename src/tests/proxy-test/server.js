import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Proxy setup
app.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:9000', 
    changeOrigin: true, 
    pathRewrite: { '^/api': '' },
    on: {
        proxyReq: (proxyReq, req, res) => {
            // Add a custom header to the proxied request
            proxyReq.setHeader('x-added-by-proxy', 'ProxyHeaderValue');
          } 
    }
}))

// Start the server
const server = app.listen(8000, () => {
  console.log('Proxy server is listening on port 8000');
});

export default server;
