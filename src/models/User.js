// user.model.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    status: { type: String, default: 'offline' },  // online, offline, busy, etc.
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
