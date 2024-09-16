// user.model.js
import mongoose, { Schema } from 'mongoose';
const DOCUMENT_NAME ='User'
const COLLECTION_NAME = 'Users'
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    status: { type: String, default: 'offline' },  // online, offline, busy, etc.
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    avatar: { type: String, default: ''},
    isVerified: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

export default mongoose.model(DOCUMENT_NAME, UserSchema);
