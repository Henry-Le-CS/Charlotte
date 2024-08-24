'use strict'
import mongoose, { Schema } from 'mongoose';

const DOCUMENT_NAME = 'Token'
const COLLECTION_NAME = 'Tokens'
const TokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    refreshToken: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    publicKey: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Tự động xoá tài liệu sau 7 ngày
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

export default mongoose.model(DOCUMENT_NAME, TokenSchema);

