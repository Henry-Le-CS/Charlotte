'use strict';

import { Types } from 'mongoose';
import keyTokenModel from '../models/keytoken.model.js';

class TokenRepository {
    static async saveToken({ userId, publicKey, privateKey, refreshToken }) {
        const token = new keyTokenModel({
            user: userId,
            publicKey,
            privateKey,
            refreshTokenUsed: [],
            refreshToken
        });
        return await token.save();
    }

    static async findByUserId(userId) {
        return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) });
    }

    static async findById(id) {
        return await keyTokenModel.findById(new Types.ObjectId(id));
    }

    static async findByRefreshToken(refreshToken) {
        return await keyTokenModel.findOne({ refreshToken }).lean();
    }

    static async findByRefreshTokenUsed(refreshToken) {
        return await keyTokenModel.findOne({ refreshTokenUsed: refreshToken }).lean();
    }

    static async updateToken({ userId, publicKey, privateKey, refreshToken }) {
        return await keyTokenModel.findOneAndUpdate(
            { user: userId },
            {
                publicKey,
                privateKey,
                refreshToken,
                refreshTokenUsed: []
            },
            { new: true, upsert: true }
        );
    }

    static async removeTokenById(id) {
        return await keyTokenModel.deleteOne({ _id: new Types.ObjectId(id) });
    }

    static async removeTokensByUserId(userId) {
        return await keyTokenModel.deleteMany({ user: new Types.ObjectId(userId) });
    }
}

export default TokenRepository;
