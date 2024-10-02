'use strict'

import NotificationModel from "../models/notification.model.js";
import userService from "./user.service.js";

export default class Notification {
    static async getAll(receiverId) {
        const notis = await NotificationModel.find({ receiverId, status: 'sent' }).select(['senderId', 'status', 'type']);
    
        const notisWithSender = await Promise.all(
            notis.map(async (noti) => {
                const sender = await userService.findUserById({
                    userId: noti.senderId,
                    select: ['_id', 'username', 'email', 'avatar', 'bio', 'createdAt']
                });
                return { ...noti.toObject(), sender };
            })
        );

        return { notisWithSender };
    }
    static async check({ senderId, receiverId, status, type }) {
        return await NotificationModel.findOne({ senderId, receiverId, status, type }).lean()
    }
    static async send({ senderId, receiverId, type }) {
        await NotificationModel.create({ senderId, receiverId, status: 'sent', type })
    }
    static async accept({ senderId, receiverId }) {
        await NotificationModel.findOneAndUpdate({ senderId, receiverId }, { status: 'accepted' }, { new: true })
        await userService.addFriend(senderId, receiverId)
    }
}