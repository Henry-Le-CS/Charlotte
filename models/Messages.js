import mongoose from "mongoose";

const Messages = mongoose.Schema({
    messageID: {type: Number, required: true},
    conversationID: {type: Number, required: true},
    senderID: {type: Number, required: true},
    content: {type: String, required: true}
}, {timestamps: true})

const MessageModel = mongoose.model('Messages', Messages)
export default MessageModel