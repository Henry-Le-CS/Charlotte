'use strict'
import mongoose, { Schema } from 'mongoose';

const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'Notifications';

const NotificationSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    receiverId: { type: Schema.Types.ObjectId, ref: 'User'},
    status: { type: String, enum: ['sent', 'accepted', 'declined'], default: 'sent' },
    type: { type: String, enum: ['request', 'noti', 'invite']},
    description: { type: String }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

NotificationSchema.index({ receiverId: 1})
NotificationSchema.index({ senderId: 1, receiverId: 1, status: 1, type: 1})
export default mongoose.model(DOCUMENT_NAME, NotificationSchema);
