'use strict'
import mongoose, { Schema } from 'mongoose';

const DOCUMENT_NAME = 'EmailVerify';
const COLLECTION_NAME = 'EmailVerifies';

const emailVerifySchema = new Schema({
    verificationToken: {
        type: String,
    },
    verificationExpired: {
        type: Date,
        require: true
    },
    type: {
        type: String,
        enum: ['registration', 'reset_password', 'login'],
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

export default mongoose.model(DOCUMENT_NAME, emailVerifySchema);
