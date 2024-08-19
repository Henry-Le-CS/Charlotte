import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import TokenRepository from '../repositories/token.repo.js';
import UserRepository from '../repositories/user.repo.js';
import { AuthFailureError, BadRequestError, NotFoundError } from './../core/error.response.js';

class UserService {
    constructor() {
        if (!UserService.instance) {
            UserService.instance = this;
        }
        return UserService.instance;
    }

    // Helper method to generate JWT tokens
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

    async registerUser(userDetails) {
        const existingUser = await UserRepository.findUserByEmail(userDetails.email);
        if (existingUser) {
            throw new BadRequestError('Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(userDetails.password, 10);
        const user = await UserRepository.createUser({
            ...userDetails,
            password_hash: hashedPassword
        });

        return user;
    }

    async loginUser({ email, password }) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password_hash)) {
            throw new BadRequestError('Invalid credentials');
        }

        // Generate JWT token pair
        const tokens = this.generateTokenPair({ id: user._id });

        // Save tokens
        await TokenRepository.saveToken(user._id, tokens.refreshToken, tokens.privateKey, tokens.publicKey);

        // Update user status
        user.status = 'online';
        await UserRepository.updateUserStatus(user._id, 'online');

        return { user, tokens: { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken } };
    }

    async logoutUser(userId) {
        await TokenRepository.removeToken(userId);
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
        await TokenRepository.updateRefreshToken(tokenRecord.userId, newTokens.refreshToken, newTokens.privateKey, newTokens.publicKey);

        return { accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken };
    }

    async updateUserProfile(userId, updateData) {
        return await UserRepository.updateUser(userId, updateData);
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
}

export default new UserService();
