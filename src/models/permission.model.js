'use strict'
import mongoose, { Schema } from "mongoose"

const DOCUMENT_NAME = 'Permission'
const COLLECTION_NAME = 'Permissions'

const permissionSchema = new Schema({
    resource: {
        type: String,
        required: true
      },
      actions: [{
        type: String,
        enum: ['create', 'read', 'write', 'delete', 'admin'],
        required: true
      }],
      userId: { type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

export default mongoose.model(DOCUMENT_NAME, permissionSchema)