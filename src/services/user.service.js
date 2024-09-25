import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { createTokenPair } from '../auth/authUtils.js';
import PermissionRepository from '../repositories/permission.repo.js';
import UserRepository from '../repositories/user.repo.js';
import ApikeyService from '../services/apiKey.service.js';
import { AuthFailureError, BadRequestError, NotFoundError } from './../core/error.response.js';
import KeyTokenService from './keytoken.service.js';
// export const apiKeyStore = new Map();



class UserService {
    constructor() {
        if (!UserService.instance) {
            UserService.instance = this;
        }
        return UserService.instance;
    }
    async registerUser(data) {
        const { userDetails, permissions } = data;
        const email = userDetails.email
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            const existingUser = await UserRepository.findUserByEmail({ email, select: ['_id']});
            if (existingUser) {
                throw new BadRequestError('Email is already registered');
            }
    
            const hashedPassword = await bcrypt.hash(userDetails.password, 10);
            const user = await UserRepository.createUser({
                ...userDetails,
                password_hash: hashedPassword,
                isVerified: false,
            }, { session });
    
            const userId = user._id;
            const { resource, actions } = permissions;
            const permission = await PermissionRepository.createPermission({ resource, actions, userId }, { session });
    
            let apiKey;
            if (user && permission) {
                const pmsId = permission._id;
                apiKey = await ApikeyService.createApiKey({ userId, pmsId }, { session });
            }
    
            if (!apiKey || !permission) {
                await UserRepository.deleteUserByUserId(userId);
                throw new BadRequestError('User creation failed. Rolling back...');
            }
    
            await session.commitTransaction();
            return {
                code: '201',
                user,
                apiKey,
            };
        } catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            throw error;
        } finally {
            session.endSession();
        }
    }
    
    

    async loginUser({ email, password }) {
        const user = await UserRepository.findUserByEmail({email});
        if (!user || !await bcrypt.compare(password, user.password_hash)) {
            throw new BadRequestError('Invalid credentials');
        }
        const userId = user._id.toString()
        // Generate JWT token pair
        const tokens = await createTokenPair({userId});
        // Save tokens
        await KeyTokenService.saveToken(userId, tokens.refreshToken, tokens.publicKey, tokens.privateKey );

        // get apiKey
        const apiKey = await ApikeyService.findByUserId(userId);
        if (!apiKey) throw new NotFoundError('API key not found')
        // Update user status
        await UserRepository.updateUserStatus({userId, status: 'online'});

        return { user, tokens: { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }, apiKey };
    }

    async logoutUser(userId) {
        await KeyTokenService.removeTokensByUserId(userId);
        await UserRepository.updateUserStatus({ userId, status: 'offline'});
    }
    async findUserById(userId) {
        await UserRepository.findUserById({ userId })
    }
    async findUserByEmail(email) {
        await UserRepository.findUserByEmail({ email, select: ['email', 'avatar', 'username', 'friends'] })
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

    async searchUsers(value) {
        try {
            const regexArray = value.split(',').map(keyword => ({
                email: { $regex: keyword, $options: 'i' }
              }));
            const users = await UserRepository.searching(regexArray)
            return users;
        } catch (error) {
            throw new NotFoundError(error.message)
        }
    }
    async addFriend(userId, yourId) {
        const user = await UserRepository.findUserById(userId);
        const your = await UserRepository.findUserById(yourId);
        if (!user || !your) {
            throw new NotFoundError('User not found');
        }

        user.friends.push(yourId);
        await user.save();

        your.friends.push(userId);
        await your.save();

        return user;
    }
    
    async updateUserStatus({ userId, status }) {
        return await UserRepository.updateUserStatus({ userId, status });
    }

}

export default new UserService();
