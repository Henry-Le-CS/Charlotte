import { CREATED, SuccessResponse } from "../core/success.response.js"
import MessageService from '../services/message.service.js'
export default new class MessageController {
    send = async (req, res, next) => {
        const { message } = req.body
        const receiverId = req.query.id
        const senderId = req.session.user || req.cookies['x-client-id']
        try {
            new CREATED({
                message: 'Message sent successfully',
                metadata: await MessageService.sendMessage(senderId, receiverId, message)
            }).send(res)
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: `Message sending failed ${error.message}`,
                status: '500 Internal Server Error'
            })
        }
    }
    get = async (req, res, next) => {
        const receiverId = req.query.id
        const senderId = req.session.user || req.cookies['x-api-key']
        try {
            new SuccessResponse({
                message: 'Get All Message Successfully',
                metadata: await MessageService.getMessage(senderId, receiverId)
            }).send(res)
        } catch (error) {
            return res.status(404).json({
                code: 404,
                message: `Get Messages Error: ${error.message}`,
                status: '404 Not Found'
            })
        }
    }
}

