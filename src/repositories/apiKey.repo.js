'use strict'
import { NotFoundError } from '../core/error.response.js';
import ApikeyModel from '../models/apiKey.model.js';

class ApiKeyRepository {
    // Tạo một API key mới
    static async createApiKey({ key, permissions }) {
        const apiKey = new ApikeyModel({ key, permissions });
        return await apiKey.save();
    }

    // Tìm API key bằng key
    static async findByKey(key) {
        return await ApikeyModel.findOne({ key, status: true }).lean();
    }

    // Cập nhật trạng thái của API key
    static async updateStatus(key, status) {
        return await ApikeyModel.findOneAndUpdate({ key }, { status }, { new: true });
    }

    // Xóa API key
    static async deleteApiKey(key) {
        return await ApikeyModel.findOneAndDelete({ key });
    }

    // Kiểm tra quyền của API key
    static async checkPermissions(key, requiredPermission) {
        const apiKey = await this.findByKey(key);
        if (!apiKey) {
            throw new NotFoundError('API key not found or inactive');
        }
        return apiKey.permissions.includes(requiredPermission);
    }
}

export default ApiKeyRepository;
