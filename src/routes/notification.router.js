'use strict'

import express from 'express'
import { authentication } from '../auth/authUtils.js'
import notificationController from '../controllers/notification.controller.js'
const router = express.Router()
router.use(authentication)
router.get('/', notificationController.getAll)
router.get('/checkRequest', notificationController.check)
router.post('/send-friend-request', notificationController.sendFriendRequest)
router.post('/accept-friend-request', notificationController.acceptFriendRequest)

export default router