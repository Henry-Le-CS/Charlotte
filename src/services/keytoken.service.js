'use strict';
import { BadRequestError, NotFoundError } from '../core/error.response.js';
import TokenRepository from '../repositories/keytoken.repo.js';

export default class KeyTokenService {
    static async saveToken({  userId, publicKey, privateKey, refreshToken }) {
        try {
            return await TokenRepository.saveToken({ userId, publicKey, privateKey, refreshToken })
        } catch (error) {
            throw new BadRequestError('Error saving token')
        }
    }
    static async createOrUpdateToken({ userId, publicKey, privateKey, refreshToken }) {
        try {
            const token = await TokenRepository.updateToken({ userId, publicKey, privateKey, refreshToken });
            return token ? token.publicKey : null;
        } catch (error) {
            throw new BadRequestError('Error creating or updating token');
        }
    }

    static async findByUserId(userId) {
        try {
            return await TokenRepository.findByUserId(userId);
        } catch (error) {
            throw new NotFoundError('Error finding token by user ID');
        }
    }

    static async removeTokenById(id) {
        try {
            return await TokenRepository.removeTokenById(id);
        } catch (error) {
            throw new BadRequestError('Error removing token by ID');
        }
    }

    static async findByRefreshToken(refreshToken) {
        try {
            return await TokenRepository.findByRefreshToken(refreshToken);
        } catch (error) {
            throw new NotFoundError('Error finding token by refresh token');
        }
    }

    static async findByRefreshTokenUsed(refreshToken) {
        try {
            return await TokenRepository.findByRefreshTokenUsed(refreshToken);
        } catch (error) {
            throw new NotFoundError('Error finding token by used refresh token');
        }
    }

    static async removeTokensByUserId(userId) {
        try {
            return await TokenRepository.removeTokensByUserId(userId);
        } catch (error) {
            throw new BadRequestError('Error removing tokens by user ID');
        }
    }
}
