'use strict'
import PermissionRepository from '../repositories/permission.repo.js';
import ApiKeyService from './../services/apiKey.service.js';
const pmsSelect = ['actions']
const permission = ['admin', 'create', 'read', 'write', 'delete']
const HEADER = {
    API_KEY: 'x-api-key',
    // AUTHORIZATION: 'authorization'
}

export default new class Check {
    apiKey = async (req, res, next) => {
        try {
            const key = req.headers[HEADER.API_KEY]?.key.toString()
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
            console.error(error)
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
}
