import express from 'express';
import { authentication } from '../auth/authUtils.js';
import messageController from '../controllers/message.controller.js';

const router = express.Router()
router.use(authentication)
router.post('/', messageController.send)
router.get('/', messageController.get)
export default router