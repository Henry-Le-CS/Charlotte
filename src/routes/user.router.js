import express from 'express';
import { authenticationV2 } from '../auth/authUtils.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router()
router.use(authenticationV2)
router.post('/register', UserController.register)
router.post('/login', UserController.loginUser)
router.post('/logout', UserController.logoutUser)
router.put('/update-profile', UserController.updateProfile)
router.post('add-friend', UserController.addFriend)
export default router