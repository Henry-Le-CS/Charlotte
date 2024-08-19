'use strict'

import TokenModel from "../models/token.model.js";

class TokenRepository {
    static async saveToken(userId, refreshToken, privateKey, publicKey) {
        const token = new TokenModel({
            userId,
            refreshToken,
            privateKey,
            publicKey,
        });
        return await token.save();
    }

    static async findByRefreshToken(refreshToken) {
        return await TokenModel.findOne({ refreshToken }).lean();
    }

    static async findByRefreshTokenUsed(refreshToken) {
        // Nếu bạn có trường để lưu các token đã sử dụng, bạn có thể triển khai logic này tại đây
        // Ví dụ: return await TokenModel.findOne({ refreshTokenUsed: refreshToken }).lean();
    }

    static async updateRefreshToken(userId, refreshToken, privateKey, publicKey) {
        return await TokenModel.findOneAndUpdate(
            { userId },
            { refreshToken, privateKey, publicKey },
            { new: true }
        );
    }

    static async removeToken(userId) {
        return await TokenModel.deleteMany({ userId });
    }

    static async deleteKeyById(userId) {
        return await TokenModel.deleteOne({ userId });
    }
}

export default TokenRepository;