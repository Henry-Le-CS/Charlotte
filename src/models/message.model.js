import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = 'Message'
const COLLECTION_NAME = 'Messages'
const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'sent' }  // sent, delivered, read
}, {timestamps: true, collection: COLLECTION_NAME});

MessageSchema.index({ message: 'text' });
export default mongoose.model(DOCUMENT_NAME, MessageSchema);