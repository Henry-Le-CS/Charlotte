import express from 'express';
import check from '../auth/checkAuth.js';
import userController from '../controllers/user.controller.js';
import proxyService from '../services/proxy.service.js';
import emailRouter from './email.router.js';
import user from './user.router.js';
const router = express.Router();

router.post('/api/user/register', userController.register);
router.use('/', emailRouter)

router.use('/api/user/login', proxyService.createProxyByHttpProxy());
router.use('/api', proxyService.accessRelease())
router.use(check.apiKey);
router.use(check.permission());

router.use('/api/user', user);

export default router;
