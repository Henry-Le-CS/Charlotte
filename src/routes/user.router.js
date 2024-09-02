import express from 'express';
import { authenticationV2 } from '../auth/authUtils.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router()
router.post('/login', UserController.loginUser)
router.use(authenticationV2)
router.post('/logout', UserController.logoutUser)
router.put('/update-profile', UserController.updateProfile)
router.post('/add-friend', UserController.addFriend)
router.post('/update-status', UserController.updateStatus)
export default router