'use strict'
import userService from '../services/user.service.js';
import { CREATED, SuccessResponse } from './../core/success.response.js';

export default new class UserController { 
    register = async (req, res, next) => {
        try {
            const results = await userService.registerUser(req.body)
            res.cookie('x-api-key', results.apiKey, { httpOnly: true })
            new CREATED({
                message: 'User registered, verification email sent',
                metadata: results.user
            }).send(res);
        } catch (error) {
            res.status(403).json({
                code: '403',
                status: 'Error Registration',
                message: error.message
            });
        }
    }
    
    loginUser = async (req, res, next) => {
        try {
            const results = await userService.loginUser(req.body)
            res.cookie('x-rtoken-id', results.tokens.refreshToken, { httpOnly: true })
            res.cookie('authorization', results.tokens.accessToken, { httpOnly: true })
            res.cookie('x-client-id', results.user._id, { httpOnly: true })
            new SuccessResponse({
                message: 'You have been logged successfully',
                metadata: results.user
            }).send(res)
        } catch (error) {
            res.status(403).json({
                code: '403',
                status: 'Error Login',
                message: error.message
            });
        }
    }
    logoutUser = async (req, res, next) => {
        new SuccessResponse({
            message: 'User logout successful',
            metadata: await userService.logoutUser(req.query)
        }).send(res)
    }
    addFriend = async (req, res, next) => {
        new SuccessResponse({
            message: 'Friend added successfully',
            metadata: await userService.addFriend(req.query)
        }).send(res)
    }
    updateProfile = async (req, res, next) => {
        new SuccessResponse({
            message: 'Profile updated successfully',
            metadata: await userService.updateUserProfile(req.body)
        }).send(res)
    }
    updateStatus = async (req, res, next) => {
        new SuccessResponse({
            message: 'Status updated successfully',
            metadata: await userService.updateUserStatus(req.body)
        }).send(res)
    }
}

