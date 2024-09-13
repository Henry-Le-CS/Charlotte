'use strict'
import { createProxyMiddleware } from 'http-proxy-middleware';
import { NotFoundError } from '../core/error.response.js';
import { apiKeyStore } from './user.service.js';

const COOKIES = {
    CLIENT_ID: 'x-client-id'
};

export default new class ProxyService {
    createProxy = (req, res, next) => {
        const userId = req.cookies[COOKIES.CLIENT_ID];
        if (!userId) {
            return next(new NotFoundError('Invalid credentials'));
        }
        const API_KEY = apiKeyStore.get(userId)?.key;
        if (!API_KEY) {
            return next(new NotFoundError('API key not found'));
        }
        const proxy = createProxyMiddleware({
            target: 'http://localhost:2055',
            changeOrigin: true,
            onProxyReq: (proxyReq, req, res) => {
                proxyReq.setHeader('x-api-key', API_KEY);
            }
        });
        proxy(req, res, next);
    }
}
