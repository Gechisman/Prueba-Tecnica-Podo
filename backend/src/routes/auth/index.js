import express from 'express'
import { register, login, registerUser } from '../../controller/auth/index.js'

const router = express.Router()

router.get('/register', register);
router.post('/register', registerUser);

router.get('/login', login);

export default router