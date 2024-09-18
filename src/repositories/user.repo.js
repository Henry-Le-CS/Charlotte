'use strict'
import UserModel from '../models/user.model.js';

class UserRepository {
    async createUser(userDetails) {
        return await UserModel.create(userDetails);
    }

    async findUserById(id) {
        return await UserModel.findById(id).populate('friends');
    }

    async findUserByEmail({ email, select = []}) {
        return await UserModel.findOne({ email }).select(select).lean();
    }

    async updateUser({ id, updateData }) {
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async updateUserStatus({ userId, status }) {
        const updatedStatus = !status
        return await UserModel.findByIdAndUpdate(userId, { updatedStatus }, { new: true });
    }
    async verified({ userId, isVerified }) {
        return await UserModel.findByIdAndUpdate(userId, { isVerified }, { new: true });
    }
    async deleteUserByUserId(userId) {
        return await UserModel.deleteOne({ userId })
    }
}

export default new UserRepository();
