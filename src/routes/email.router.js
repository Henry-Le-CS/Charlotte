'use strict'

import express from 'express';
import { emailVerifyForRegistration } from '../services/emailVerify.service.js';
const router = express.Router();

router.get('/signup-verify-email', emailVerifyForRegistration)

export default router;