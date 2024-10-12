import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = 'Conversation'
const COLLECTION_NAME = 'Conversations'
const Conversations = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],
}, {timestamps: true, collection: COLLECTION_NAME})


export default mongoose.model(DOCUMENT_NAME, Conversations)
