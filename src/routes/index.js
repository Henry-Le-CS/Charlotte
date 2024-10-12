import express from 'express';
import check from '../auth/checkAuth.js';
import userController from '../controllers/user.controller.js';
import proxyService from '../services/proxy.service.js';
import emailRouter from './email.router.js';
import message from './message.router.js';
import notification from './notification.router.js';
import user from './user.router.js';
const router = express.Router();

router.post('/user/register', userController.register);
router.use('/email', emailRouter)


// router.use('/', proxyService.getApiKey, proxyService.createHeaderForApiKey()); // DOWN DIFFICULT LEVEL
router.get('/user/checkStatus', check.status)
router.post('/user/login', userController.loginUser)
router.use('/', proxyService.accessRelease())
router.use(check.apiKey);
router.use(check.permission());

router.use('/user', user);
router.use('/notifications', notification)
router.use('/message', message)
export default router;
