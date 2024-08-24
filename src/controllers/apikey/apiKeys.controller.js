'use strict'

import { SuccessResponse } from "../../core/success.response.js"
import ApiKeyService from "../../services/apiKey.service"

export default new class ApiKeyController {
    findByKey = async (req, res, next) => {
        new SuccessResponse({
            message: 'API Key found successfully',
            metadata: await ApiKeyService.findByKey(req.query)
        }).send(res)
    }
}