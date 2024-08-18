'use strict'
import userService from '../services/user.service.js';
import { SuccessResponse } from './../core/success.response.js';

export default new class UserController { 
    register = async (req, res, next) => {
        new SuccessResponse({
            message: 'User registration successful',
            metadata: await userService.registerUser(req.body)
        }).send(res)
    }
    loginUser = async (req, res, next) => {
        new SuccessResponse({
            message: 'User login successful',
            metadata: await userService.loginUser(req.body)
        }).send(res)
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
}

