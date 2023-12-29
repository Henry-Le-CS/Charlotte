import express from "express";
import { CreateChat, FindChat } from "../controllers/chatController.js";
const router = express.Router()

router.post('/create', CreateChat)
router.get('/:id', FindChat)
export default router