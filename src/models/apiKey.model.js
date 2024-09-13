import mongoose, { Schema } from 'mongoose';

const DOCUMENT_NAME = 'Apikey';
const COLLECTION_NAME = 'Apikeys';

const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    permissions: { type: Schema.Types.ObjectId, ref: 'Permission'},
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
apiKeySchema.index({ _id: 1, permissions: 1, userId: 1 });

export default mongoose.model(DOCUMENT_NAME, apiKeySchema);
