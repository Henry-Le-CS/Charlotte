'use strict'
import userService from '../services/user.service.js';
import { CREATED, SuccessResponse } from './../core/success.response.js';

const cookiesOptions = {
    httpOnly: true,
    secure: true, 
    sameSite: 'none'
}
export default new class UserController { 
    register = async (req, res, next) => {
        try {
            const results = await userService.registerUser(req.body)
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
            req.session.isAuthenticated = true
            req.session.user = results.user._id
            req.session.accessToken = results.tokens.accessToken
            res.cookie('x-api-key', results.apiKey.key, cookiesOptions)
            res.cookie('x-rtoken-id', results.tokens.refreshToken, cookiesOptions)
            res.cookie('authorization', results.tokens.accessToken, cookiesOptions)
            res.cookie('x-client-id', results.user._id, { httpOnly: false, secure: true, sameSite: 'none'})
            new SuccessResponse({
                message: 'You have been logged successfully',
                metadata: results.user
            }).send(res)
        } catch (error) {
            res.status(403).json({
                code: 403,
                status: 'Error Login',
                message: error.message
            });
        }
    }
    logoutUser = async (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if (err) {
                    throw new BadRequestError('Failed to destroy session', err);
                } else {
                    res.clearCookie('x-client-id')
                }
            });
            new SuccessResponse({
                message: 'User logout successful',
                metadata: await userService.logoutUser(req.query.userId)
            }).send(res)
        } catch (error) {
            return res.status(500).json({
                code: 500,
                status: 'Error Logout',
                message: error.message
            })
        }
    }
    loadUser = async (req, res, next) => {
        try {
            const userId = req.cookies['x-client-id']
            new SuccessResponse({
                message: 'User found successfully',
                metadata: await userService.findUserById({ userId })
            }).send(res)
        } catch (error) {
            return res.status(404).json({
                code: 404,
                message: 'User Not Found: ' + error.message,
                status: '404 Not Found'
            })
        }
    }
    addFriend = async (req, res, next) => {
        new SuccessResponse({
            message: 'Friend added successfully',
            metadata: await userService.addFriend(req.query)
        }).send(res)
    }
    getFriends = async (req, res, next) => {
        const userId = req.query.friendId
        new SuccessResponse({
            message: 'Friends getted successfully',
            metadata: await userService.findUserById({ userId, select: ['username', 'email', 'bio', 'avatar', 'status', 'createdAt']})
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
    search = async (req, res, next) => {
        try {
            new SuccessResponse({
                message: 'User found successfully',
                metadata: await userService.searchUsers(req.query.users)
            }).send(res)
        } catch (error) {
            return res.status(404).json({
                code: 404,
                message: 'Not Found',
                status: '404 Not Found'
            })
        }
    }
    recover = async (req, res, next) => {
        try {
            new SuccessResponse({
                message: 'Recovery email sent successfully',
                metadata: await userService.recoverPassword(req.query.email)
            }).send(res)
        } catch (error) {
            return res.status(404).json({
                code: 404,
                message: 'User Not Found: ' + error.message,
                status: '404 Not Found'
            })
        }
    }

    recoveryPassword = async (req, res, next) => {
        try {
            const { password, userId } = req.body
            new SuccessResponse({
                message: 'Password updated successfully',
                metadata: await userService.updatePassword(password, userId)
            }).send(res)
        } catch (error) {
            res.status(500).json({
                cod: 500,
                message: error.message,
                status: 'Error Recovery Password'
            })
        }
    }
}

