'use strict';

import { Types } from 'mongoose';
import keyTokenModel from '../models/keytoken.model.js';
const select = ['userId', 'publicKey', 'privateKey']
class TokenRepository {
    static async saveToken({ userId, refreshToken, publicKey, privateKey }) {
        return await keyTokenModel.create({
            userId,
            publicKey,
            privateKey,
            refreshTokenUsed: [],
            refreshToken
        });
    }

    static async findByUserId(userId) {
        return await keyTokenModel.findOne({ userId }).lean()
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
