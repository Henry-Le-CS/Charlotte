'use strict';
import httpProxy from 'http-proxy';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { BadRequestError, NotFoundError } from '../core/error.response.js';
import ApiKeyRepository from '../repositories/apiKey.repo.js';
import userRepo from '../repositories/user.repo.js';
const COOKIES = {
    CLIENT_ID: 'x-client-id',
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-rtoken-id'
};

export default new class ProxyService {
    getApiKey = async (req, res, next) => {
        if (!req.session.isAuthenticated) {
            try {
                const email = req.body.email;
                const userId = await userRepo.findUserByEmail({ email, select: ['_id'] });
                if (!userId) {
                    return res.status(404).json({ message: 'User not found' });
                }
        
                const key = await ApiKeyRepository.findByUserId(userId);
                const apiKey = req.cookies[COOKIES.API_KEY] || key.key;
        
                if (!apiKey) {
                    return res.status(404).json({ message: 'API key not found' });
                }
                req.apiKey = apiKey;
                return next();
            } catch (error) {
                throw new BadRequestError('API Key Error:: ', error.message)
            }
        } else {
            return next()
        }
    }
    createProxyByProxyMiddleware = () => {
        return (req, res, next) => {
            if (!req.session.isAuthenticated) {
                createProxyMiddleware({
                    target: 'http://localhost:2055',
                    changeOrigin: true,
                    pathRewrite: { '^/api': '' },
                    on: {
                        proxyReq: (proxyReq, req, res) => {
                            try {
                                proxyReq.setHeader('x-api-key', req.apiKey); // CORE IS HERE
                                req.headers['x-api-key'] = req.apiKey
                            } catch (error) {
                                return res.status(500).json({
                                    code: 500,
                                    message: `Internal Server Error:: ${error.message}`,
                                    status: 'error',
                                })
                            }
                        },
                        error: (err, req, res) => {
                            console.error('Proxy error:', err); 
                            res.writeHead(500, {
                                'Content-Type': 'text/plain',
                            });
                            res.end(JSON.stringify({
                                message: 'Something went wrong on proxy request. Please retry.',
                                error: err.message
                            }));
                        },
                    }
                });
            } else {
                return next()
            }
        }
    }
    createHeaderForApiKey = () => {
        return (req, res, next) => {
            if (!req.session.isAuthenticated) {
                try {
                    const apiKey = req.apiKey
                    if (!apiKey) throw new NotFoundError('Not found API key')
                    res.cookie[COOKIES.API_KEY] = apiKey
                    return next()
                } catch (error) {
                    return res.status(500).json({
                        code: 500,
                        message: `Internal Server Error:: ${error.message}`,
                        status: 'error',
                    })
                }
            } else {
                return next()
            }
        }
    }
    createProxyByHttpProxy = () => {
        return (req, res, next) => {
            if (!req.session.isAuthenticated) {
                try {
                    const proxy = httpProxy.createProxyServer({});
                    proxy.web(req, res, {
                        target: 'http://localhost:2055',
                        changeOrigin: true,
                        selfHandleResponse: false,
                        headers: {
                            'x-api-key': req.apiKey
                        }
                    });
    
                    proxy.on('error', (err) => {
                        console.error('Proxy error:', err);
                        res.writeHead(500, {
                            'Content-Type': 'text/plain',
                        });
                        res.end(JSON.stringify({
                            message: 'Something went wrong on proxy request. Please retry.',
                            error: err.message,
                        }));
                    });
                    return next()
                } catch (error) {
                    res.status(500).json({
                        code: 500,
                        message: `Internal Server Error:: ${error.message}`,
                        status: 'error',
                    })
                }
            }
        }
    }
    accessRelease = () => {
        return (req, res, next) => {
            try {
                const apiKey = req.cookies[COOKIES.API_KEY]
                if (!apiKey) throw new NotFoundError('API key not found');
                const authorization = req.cookies[COOKIES.AUTHORIZATION];
                if (!authorization) throw new NotFoundError('Not Authorized');
                const refreshToken = req.cookies[COOKIES.REFRESHTOKEN]
                if (!refreshToken) throw new NotFoundError('Refresh token not found');
                const clientId = req.cookies[COOKIES.CLIENT_ID]
                if (!clientId) throw new NotFoundError('User not found')
                req.headers[COOKIES.API_KEY] = apiKey
                req.headers[COOKIES.AUTHORIZATION] = authorization;
                req.headers[COOKIES.REFRESHTOKEN] = refreshToken;
                req.headers[COOKIES.CLIENT_ID] = clientId;
                return next()
            } catch (error) {
                return res.status(500).json({
                    code: 500,
                    message: error.message,
                    status: 'error',
                })
            }
        }
    }
};
