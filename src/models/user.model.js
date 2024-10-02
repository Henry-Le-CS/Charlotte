// user.model.js
import mongoose, { Schema } from 'mongoose';
const DOCUMENT_NAME ='User'
const COLLECTION_NAME = 'Users'
const UserSchema = new Schema({
    username: { type: String, required: true, autoIndex: true },
    email: { type: String, required: true, unique: true, autoIndex: true },
    password_hash: { type: String, required: true },
    status: { type: String, default: 'offline' },  // online, offline, busy, etc.
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    avatar: { type: String, default: ''},
    bio: { type: String, trim: true, maxLength: 500, default: ''},
    isVerified: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
UserSchema.index({ username: 1, email: 1 });
UserSchema.on('index', function(err) {
    if (err) {
        console.error('User index error: %s', err);
    } else {
        console.info('User indexing complete');
    }
});
mongoose.set('debug', true);

export default mongoose.model(DOCUMENT_NAME, UserSchema);
