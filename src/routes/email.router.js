'use strict'

import express from 'express';
import { emailVerified, sendEmail } from '../services/emailVerify.service.js';
const router = express.Router();
router.get('/send-email', sendEmail)
router.get('/register', emailVerified)
router.get('/reset-password', emailVerified)

export default router;