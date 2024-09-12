'use strict'

import permissionModel from "../models/permission.model.js";
import { getSelectData } from './../utils/index.js';

class PermissionRepository {
    static async createPermission({ resource, actions, userId }) {
        return await permissionModel.create({resource, actions, userId})
    }
    static async updatePermission({ pmsId, resource, actions, userId }) {
        return await permissionModel.updateOne({ _id: pmsId }, { resource, actions, userId })
    }
    static async findPermissionById({ pmsId, pmsSelect}) {
        return await permissionModel.findById(pmsId).select(getSelectData(pmsSelect)).lean()
    }
}

export default PermissionRepository