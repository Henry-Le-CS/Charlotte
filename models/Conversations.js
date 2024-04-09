import mongoose from "mongoose";

const Conversations = mongoose.Schema({
    conversationID: {type: Number, required: true},
    participants: {type: Array, required: true},
}, {timestamps: true})


const ConversationsModel = mongoose.model('Conversations', Conversations)
export default ConversationsModel