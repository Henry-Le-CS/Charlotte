'use strict'
import { AuthFailureError, BadRequestError } from '../core/error.response.js';
import PermissionRepository from '../repositories/permission.repo.js';
import KeyTokenService from '../services/keytoken.service.js';
import userService from '../services/user.service.js';
import ApiKeyService from './../services/apiKey.service.js';
import { verifyJWT } from './authUtils.js';
const pmsSelect = ['actions']
const permission = ['admin', 'create', 'read', 'write', 'delete']
const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

export default new class Check {
    status = async (req, res) => {
        try {
            const accessToken = req.session.accessToken || req.cookies[HEADER.AUTHORIZATION]
            const userId = req.cookies['x-client-id']
            const key = await KeyTokenService.findByUserId({ userId, select: ['publicKey']})
                if (accessToken) {
                    try {
                        await verifyJWT(accessToken, key.publicKey);
                        return res.status(200).json({
                            code: 200,
                            message: 'You are allready logged in, wait for return to your home!',
                            status: 'Success'
                        })
                    } catch (error) {
                        await KeyTokenService.removeTokensByUserId(userId)
                        await userService.updateUserStatus({ userId, status: 'offline'})
                        req.session.destroy((err) => {
                            if (err) {
                                throw new BadRequestError('Failed to destroy session', err);
                            } else {
                                console.log('All sessions destroyed');
                            }
                        });
                        throw new AuthFailureError('Access Denied: Please login again!!', error);
                    }
                } else {
                    throw new AuthFailureError('Access Denied: Please login first!!')
                }
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: `check status failed ${error.message}`,
                status: 'error'
            })
        }
    }
    apiKey = async (req, res, next) => {
        console.log(req.headers)
        try {
            const key = req.headers[HEADER.API_KEY]?.toString()
            if (!key) {
                return res.status(403).json({
                    message: 'Forbidden Error'
                })
            }
            // check objKey
            const objKey = await ApiKeyService.findByKey(key)
            if (!objKey) {
                return res.status(403).json({
                    message: 'Forbidden Error'
                })
            }
            req.objKey = objKey
            return next()
        } catch (error) {
            throw new BadRequestError('API Key Checking Failed:: ', error.message)
        }
    }
    permission = () => {
        return async (req, res, next) => {
            if (!req.objKey.permissions) {
                return res.status(403).json({
                    message: 'Permission Denied'
                })
            }
            const pmsId = req.objKey.permissions
            const permissions = await PermissionRepository.findPermissionById({ pmsId, pmsSelect})
            const validPermission = permission.some(pms => permissions.actions.includes(pms))
            if (!validPermission) {
                return res.status(403).json({
                    message: 'Permission Denied'
                })
            }
            return next()
        }
    }

    accessToken = ({ accessToken, userId}) => {
        return async (req, res, next) => {
            try {
                const results = await KeyTokenService.findByUserId({ userId, select: ['publicKey']})
                const { publicKey } = results
                await verifyJWT(accessToken, publicKey)
            } catch (error) {
                return res.status(401).json({
                    code: 500,
                    message: `AccessToken Error ${error.message}`,
                    status: 'error'
                })
            }
        }
    }
}
