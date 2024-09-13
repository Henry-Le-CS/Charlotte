'use strict';
import httpProxy from 'http-proxy';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { NotFoundError } from '../core/error.response.js';
const COOKIES = {
    CLIENT_ID: 'x-client-id',
    API_KEY: 'x-api-key',
};

export default new class ProxyService {
    createProxyByProxyMiddleware = () => {
        return createProxyMiddleware({
            target: 'http://localhost:2055/api',
            changeOrigin: true,
            on: {
                proxyReq: (proxyReq, req, res) => {
                    const apiKey = req.cookies[COOKIES.API_KEY];
    
                    if (!apiKey) {
                        throw new NotFoundError('API key not found');
                    }
                    proxyReq.setHeader('x-api-key', apiKey);
                },
                error: (err, req, res) => {
                    console.error('Proxy error:', err); 
                    res.writeHead(500, {
                        'Content-Type': 'application/json',
                    });
                    res.end(JSON.stringify({
                        message: 'Something went wrong on proxy request. Please retry.',
                        error: err.message
                    }));
                },
                proxyRes: (proxyRes, req, res) => {
                    console.log('Proxied response received with status:', proxyRes.statusCode);
                }
            }
        });
    }
    createProxyByHttpProxy = () => {
        const proxy = httpProxy.createProxyServer({
            target: 'http://localhost:2055/api',
            changeOrigin: true,
        });

        return (req, res, next) => {
            try {
                const apiKey = req.cookies[COOKIES.API_KEY];

                if (!apiKey) {
                    throw new NotFoundError('API key not found');
                }

                req.headers['x-api-key'] = apiKey;
                proxy.web(req, res, {
                    onError: (err) => {
                        console.error('Proxy error:', err);
                        res.writeHead(500, {
                            'Content-Type': 'application/json',
                        });
                        res.end(JSON.stringify({
                            message: 'Something went wrong on proxy request. Please retry.',
                            error: err.message
                        }));
                    },
                });
                return next()
            } catch (error) {
                return res.status(500).json({
                    code: 500,
                    message: error.message,
                    status: 'error',
                })
            }
        };
    }
};
