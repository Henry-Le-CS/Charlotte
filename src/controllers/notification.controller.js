'use strict'
import { SuccessResponse } from '../core/success.response.js';
import Notification from '../services/notification.services.js';

export default new class NotificationController {
    getAll = async (req, res, next) => {
        try {
            const receiverId = req.session.user || req.cookies['x-api-key']
            new SuccessResponse({
                message: 'Get all notifications successfully',
                metadata: await Notification.getAll(receiverId)
            }).send(res)
        } catch (error) {
            return res.status(404).json({
                code: 404,
                message: error.message,
                status: '404 Not Found'
            })
        }
    }
    check = async (req, res, next) => {
        try {
            const senderId = req.session.user || req.cookies['x-api-key']
            const receiverId = req.query.receiverId
            const status = req.query.status
            const type = req.query.type
            if (senderId && receiverId) {
                new SuccessResponse({
                    message: 'Notification check successfully',
                    metadata: await Notification.check({ senderId, receiverId, status, type })
                }).send(res)
            }
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request: ' + error.message,
                status: '400 Bad Request'
            })
        }
    }
    sendFriendRequest = async (req, res, next) => {
        try {
            const senderId = req.session.user || req.cookies['x-api-key']
            const receiverId = req.query.receiverId
            if (senderId && receiverId) {
                new SuccessResponse({
                    message: 'Friend request sent successfully',
                    metadata: await Notification.send({ senderId, receiverId, type:'request'})
                }).send(res)
            }
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request: ' + error.message,
                status: '400 Bad Request'
            })
        }
    }
    acceptFriendRequest = async (req, res, next) => {
        try {
            const senderId = req.session.user
            const receiverId = req.query.receiverId
            if (senderId && friendId) {
                new SuccessResponse({
                    message: 'Friend request sent successfully',
                    metadata: await FriendRequest.accept({ senderId, receiverId})
                }).send(res)
            }
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: 'Bad Request: ' + error.message,
                status: '400 Bad Request'
            })
        }
    }
}