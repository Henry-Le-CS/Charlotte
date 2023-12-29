import mongoose from "mongoose";

const Chat = mongoose.Schema({
    member: {type: Array, required: true},
}, {timestamps: true})


const ChatModel = mongoose.model('Chat', Chat)
export default ChatModel