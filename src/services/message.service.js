import io from "../../server.js";
import { BadRequestError, NotFoundError } from "../core/error.response.js";
import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";

export default class MessageService {
    static async getMessage(senderId, receiverId) {
        try {
            const conversation = await conversationModel.findOne({
                participants: { $all: [senderId, receiverId] }
            }).populate('messages').select(['receiver, sender, message'])
            if (!conversation) throw new NotFoundError('Not Found Conversation')

            return conversation.messages;
        } catch (error) {
            throw new BadRequestError(error.message)
        }
    }
    static async sendMessage(senderId, receiverId, message) {
        try {
            let conversation = await conversationModel.findOne({
                participants: { $all: [senderId, receiverId] }
            })
            if (!conversation) {
                conversation = await conversationModel.create({
                    participants: [senderId, receiverId],
                });
            }
            const newMessage = new messageModel({
                sender: senderId,
                receiver: receiverId,
                message,
            });

            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            await Promise.all([conversation.save(), newMessage.save()]);

            // SOCKET IO FUNCTIONALITY WILL GO HERE
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                // io.to(<socket_id>).emit() used to send events to specific client
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }
            return newMessage
        } catch (error) {
            throw new BadRequestError(error.message)
        }
    }
}