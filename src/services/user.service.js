import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import crypto from 'node:crypto';
import PermissionRepository from '../repositories/permission.repo.js';
import UserRepository from '../repositories/user.repo.js';
import ApikeyService from '../services/apiKey.service.js';
import { AuthFailureError, BadRequestError, NotFoundError } from './../core/error.response.js';
import KeyTokenService from './keytoken.service.js';
// export const apiKeyStore = new Map();
import nodemailer from 'nodemailer';
import emailVerifyModel from '../models/emailVerify.model.js';



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
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GOOGLE_ACCOUNT_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD
            }
        })
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            const existingUser = await UserRepository.findUserByEmail(userDetails.email);
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
                throw new Error('User creation failed. Rolling back...');
            }
    
            await session.commitTransaction();
    
            const verificationToken = crypto.randomBytes(32).toString('hex');
            await emailVerifyModel.create({
                verificationToken,
                verificationExpires: Date.now() + 3600000,
                type: 'registration',
                userId
            });
    
            const verificationLink = `${process.env.SERVER_URI}/signup-verify-email?email=${userDetails.email}&token=${verificationToken}`;
            const mailOptions = ({
                from: '"Charlotte" <charlotte.webapp@gmail.com>',
                to: userDetails.email,
                subject: 'Email Verification',
                html: `
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
                        <tr>
                            <td align="center">
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; padding: 40px; border-radius: 8px;">
                                <tr>
                                <td align="center" style="font-family: Arial, sans-serif; color: #333333; font-size: 18px;">
                                    <p style="margin-bottom: 24px;">Vui lòng nhấn nút bên dưới để xác minh địa chỉ email của bạn và hoàn tất đăng ký.</p>
                                    <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 14px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">Xác Minh Email</a>
                                </td>
                                </tr>
                                <tr>
                                <td align="center" style="padding-top: 20px; font-family: Arial, sans-serif; font-size: 14px; color: #999999;">
                                    <p>Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này.</p>
                                </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        </table>

                `
            });
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log('Error: ', err);
                } else {
                    console.log('Email sent: ', info.response);
                }
            });
    
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
