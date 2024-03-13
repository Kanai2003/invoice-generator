import {Router} from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js';

import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
} from '../controllers/user.controller.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get("/me", verifyJWT, getCurrentUser)
router.get("/logout", verifyJWT, logoutUser)

export default router