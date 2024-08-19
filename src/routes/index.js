import express from 'express'
import check from '../auth/checkAuth.js'
const router = express.Router()

router.use(check.apiKey())
router.use(check.permission())

export default router