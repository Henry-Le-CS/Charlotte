'use strict';
import crypto from 'node:crypto';
import { NotFoundError } from '../core/error.response.js';
import ApiKeyRepository from '../repositories/apiKey.repo.js';

class ApiKeyService {
    // Tìm API key theo key và trả về thông tin chi tiết
    static async findByKey(key) {
        const apiKey = await ApiKeyRepository.findByKey(key);
        if (!apiKey) {
            throw new NotFoundError('API key not found or inactive');
        }
        return apiKey;
    }

    // Tạo một API key mới
    static async createApiKey({ permissions }) {
        const key = crypto.randomBytes(64).toString('hex');
        return await ApiKeyRepository.createApiKey({ key, permissions });
    }

    // Cập nhật trạng thái của API key
    static async updateStatus(key, status) {
        const updatedApiKey = await ApiKeyRepository.updateStatus(key, status);
        if (!updatedApiKey) {
            throw new NotFoundError('API key not found');
        }
        return updatedApiKey;
    }

    // Xóa một API key
    static async deleteApiKey(key) {
        const deletedApiKey = await ApiKeyRepository.deleteApiKey(key);
        if (!deletedApiKey) {
            throw new NotFoundError('API key not found');
        }
        return deletedApiKey;
    }

    // Kiểm tra quyền của API key
    static async checkPermissions(key, requiredPermission) {
        return await ApiKeyRepository.checkPermissions(key, requiredPermission);
    }
}

export default ApiKeyService;
