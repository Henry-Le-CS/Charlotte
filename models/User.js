import mongoose from "mongoose";

const User = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true},
    phoneNumber: { type: Number, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    avatar: { type: String, required: false}
})

const UserModel = mongoose.model('User', User)
export default UserModel