import mongoose from "mongoose";

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'
const User = mongoose.Schema({
    userId: { type: Number, required: true },
    name: { type: String, required: true},
    phoneNumber: { type: Number, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    avatar: { type: String, required: false}
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

const UserModel = mongoose.model(DOCUMENT_NAME, User)
export default UserModel