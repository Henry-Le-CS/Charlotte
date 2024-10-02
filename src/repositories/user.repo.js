'use strict'
import { BadRequestError } from '../core/error.response.js';
import UserModel from '../models/user.model.js';

class UserRepository {
    async createUser(userDetails) {
        return await UserModel.create(userDetails);
    }

    async findUserById({ userId, select = [] }) {
        return await UserModel.findById(userId).select(select)
    }

    async findUserByEmail({ email, select = []}) {
        return await UserModel.findOne({ email }).select(select).lean();
    }
    async searching(value) {
        return await UserModel.find({ $or: value } )
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
    async addFriend({ userId, friendId }) {
        try {
            return await Promise.all([
                UserModel.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { friends: friendId } }
                ),
                UserModel.findOneAndUpdate(
                    { _id: friendId },
                    { $addToSet: { friends: userId } }
                )
            ]);
        } catch (error) {
            throw new BadRequestError('Failed to add friend:: ', error.message);
        }
    }
}

export default new UserRepository();
