import mongoose from "mongoose";

const Messages = mongoose.Schema({
    chatID: {type: String, required: true},
    senderID: {type: String, required: true},
    text: {type: String, required: true}
}, {timestamps: true})

const MessageModel = mongoose.model('Messages', Messages)
export default MessageModel