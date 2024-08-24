'use strict'
import UserModel from '../models/user.model.js';

class UserRepository {
    async createUser(userDetails) {
        return await UserModel.create(userDetails);
    }

    async findUserById(id) {
        return await UserModel.findById(id).populate('friends');
    }

    async findUserByEmail(email) {
        return await UserModel.findOne({ email }).lean();
    }

    async updateUser(id, updateData) {
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async updateUserStatus(id, status) {
        return await UserModel.findByIdAndUpdate(id, { status }, { new: true });
    }
    async deleteUserByUserId(userId) {
        return await UserModel.deleteOne({ userId })
    }
}

export default new UserRepository();
