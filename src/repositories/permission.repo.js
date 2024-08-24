'use strict'

import permissionModel from "../models/permission.model.js"

class PermissionRepository {
    static async createPermission({ resource, actions, userId }) {
        return await permissionModel.create(resource, actions, userId)
    }
}

export default PermissionRepository