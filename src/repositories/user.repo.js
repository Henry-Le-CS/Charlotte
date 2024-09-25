'use strict'
import UserModel from '../models/user.model.js';

class UserRepository {
    async createUser(userDetails) {
        return await UserModel.create(userDetails);
    }

    async findUserById({ userId }) {
        return await UserModel.findById(userId).populate('friends');
    }

    async findUserByEmail({ email, select = []}) {
        return await UserModel.findOne({ email }).select(select).lean();
    }
    async searching(value) {
        console.log(value)
        return await UserModel.find({ $or: value } ).populate('friends');
    }
    async updateUser({ id, updateData }) {
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async updateUserStatus({ userId, status = '' }) {
        return await UserModel.findByIdAndUpdate(userId, { status }, { new: true });
    }
    async verified({ userId, isVerified }) {
        return await UserModel.findByIdAndUpdate(userId, { isVerified }, { new: true });
    }
    async deleteUserByUserId(userId) {
        return await UserModel.deleteOne({ userId })
    }
}

export default new UserRepository();
