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
        return await UserModel.findOne({ email });
    }

    async updateUser(id, updateData) {
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async updateUserStatus(id, status) {
        return await UserModel.findByIdAndUpdate(id, { status }, { new: true });
    }
}

export default new UserRepository();
