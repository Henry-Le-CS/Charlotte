'use strict'
import mongoose from 'mongoose';

const { Schema } = mongoose;

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
});

export default mongoose.model('Token', TokenSchema);

