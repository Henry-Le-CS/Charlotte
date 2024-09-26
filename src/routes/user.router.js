import express from 'express';
import { authentication } from '../auth/authUtils.js';
import userController from '../controllers/user.controller.js';

const router = express.Router()
router.use(authentication)
router.get('', userController.loadUser)
router.get('/search', userController.search)
router.get('/logout', userController.logoutUser)
router.put('/update-profile', userController.updateProfile)
router.post('/add-friend', userController.addFriend)
router.post('/update-status', userController.updateStatus)
export default router