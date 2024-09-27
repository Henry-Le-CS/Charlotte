'use strict'

import NotificationModel from "../models/notification.model.js"
import userService from "./user.service.js"

export default class Notification {
    static async getAll(receiverId) {
        return await NotificationModel.find({ receiverId })
    }
    static async check({ senderId, receiverId, status, type }) {
        return await NotificationModel.findOne({ senderId, receiverId, status, type })
    }
    static async send({ senderId, receiverId, type }) {
        await NotificationModel.create({ senderId, receiverId, status: 'sent', type })
    }
    static async accept({ senderId, receiverId }) {
        await NotificationModel.findOneAndUpdate({ senderId, receiverId }, { status: 'accepted' }, { new: true })
        await userService.addFriend(senderId, receiverId)
    }
}