'use strict'

import express from 'express';
import { emailVerifyForRegistration, sendEmail } from '../services/emailVerify.service.js';
const router = express.Router();
router.post('/send-email', sendEmail)
router.get('/signup-verify-email', emailVerifyForRegistration)

export default router;