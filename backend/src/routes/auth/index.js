import express from 'express'
import { register, login, loginUser, registerUser, logoutUser } from '../../controller/auth/index.js'

const router = express.Router()

router.get('/register', register);
router.post('/register', registerUser);

router.get('/login', login);
router.post('/login', loginUser);

router.get('/logout', logoutUser);

export default router