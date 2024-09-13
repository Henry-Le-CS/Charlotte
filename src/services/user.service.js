import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import crypto from 'node:crypto';
import PermissionRepository from '../repositories/permission.repo.js';
import UserRepository from '../repositories/user.repo.js';
import ApikeyService from '../services/apiKey.service.js';
import { AuthFailureError, BadRequestError, NotFoundError } from './../core/error.response.js';
import KeyTokenService from './keytoken.service.js';
export const apiKeyStore = new Map();

class UserService {
    constructor() {
        if (!UserService.instance) {
            UserService.instance = this;
        }
        return UserService.instance;
    }

    generateTokenPair(payload) {
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const accessToken = jwt.sign(payload, privateKey, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, publicKey, { expiresIn: '7d' });

        return { accessToken, refreshToken, privateKey, publicKey };
    }

    // Helper method to verify tokens
    verifyToken(token, key) {
        try {
            return jwt.verify(token, key);
        } catch (error) {
            throw new AuthFailureError('Invalid or expired token');
        }
    }

    async registerUser(data) {
        const { userDetails, permissions } = data;
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            let apiKey;
            const existingUser = await UserRepository.findUserByEmail(userDetails.email);
            if (existingUser) {
                throw new BadRequestError('Email is already registered');
            }
    
            const hashedPassword = await bcrypt.hash(userDetails.password, 10);
            const user = await UserRepository.createUser({
                ...userDetails,
                password_hash: hashedPassword
            }, { session });
    
            const userId = user._id;
            const { resource, actions } = permissions;
            const permission = await PermissionRepository.createPermission({ resource, actions, userId }, { session });
    
            if (user && permission) {
                const pmsId = permission._id;
                apiKey = await ApikeyService.createApiKey({ userId, pmsId }, { session });
                apiKeyStore.set(userId.toString(), apiKey)
            }
    
            if (!apiKey || !permission) {
                await UserRepository.deleteUserByUserId(userId);
            }
    
            await session.commitTransaction();
            
            return {
                code: '201',
                user
            };
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
    

    async loginUser({ email, password }) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password_hash)) {
            throw new BadRequestError('Invalid credentials');
        }

        // Generate JWT token pair
        const tokens = this.generateTokenPair({ id: user._id });
        // Save tokens
        await KeyTokenService.saveToken(user._id, tokens.refreshToken, tokens.privateKey, tokens.publicKey);

        // Update user status
        await UserRepository.updateUserStatus(user._id, 'online');

        return { user, tokens: { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken } };
    }

    async logoutUser(userId) {
        await KeyTokenService.removeTokensByUserId(userId);
        await UserRepository.updateUserStatus(userId, 'offline');
    }

    async refreshAccessToken(refreshToken) {
        const tokenRecord = await TokenRepository.findByRefreshToken(refreshToken);
        if (!tokenRecord) {
            throw new AuthFailureError('Invalid refresh token');
        }

        const payload = this.verifyToken(refreshToken, tokenRecord.publicKey);

        // Generate new token pair
        const newTokens = this.generateTokenPair({ id: payload.id });

        // Update the refresh token in the database
        await KeyTokenService.createOrUpdateToken(tokenRecord.userId, newTokens.refreshToken, newTokens.privateKey, newTokens.publicKey);

        return { accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken };
    }

    async updateUserProfile({ userId, updateData }) {
        return await UserRepository.updateUser({ userId, updateData });
    }

    async addFriend(userId, friendId) {
        const user = await UserRepository.findUserById(userId);
        const friend = await UserRepository.findUserById(friendId);
        if (!user || !friend) {
            throw new NotFoundError('User not found');
        }

        user.friends.push(friendId);
        await user.save();

        friend.friends.push(userId);
        await friend.save();

        return user;
    }
    
    async updateUserStatus({ userId, status }) {
        return await UserRepository.updateUserStatus({ userId, status });
    }
}

export default new UserService();
