import express from 'express';
import check from '../auth/checkAuth.js';
import userController from '../controllers/user.controller.js';
import proxyService from '../services/proxy.service.js';
import emailRouter from './email.router.js';
import user from './user.router.js';
const router = express.Router();

router.post('/user/register', userController.register);
router.use('/email', emailRouter)


// router.use('/', proxyService.getApiKey, proxyService.createHeaderForApiKey()); // DOWN DIFFICULT LEVEL
router.post('/user/login', userController.loginUser)
router.use('/', proxyService.accessRelease())
router.use(check.apiKey);
router.use(check.permission());

router.use('/user', user);

export default router;
