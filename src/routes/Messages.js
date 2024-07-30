import express from 'express';
import { FindMessages, SendMessage } from '../controllers/messagesController.js';
const router = express.Router()

router.post('/sending', SendMessage)
router.get('/:id', FindMessages)
export default router