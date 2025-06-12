import express from 'express'
import { register, login } from '../../controller/auth/index.js'

const router = express.Router()

router.get('/register', register);
router.post('/register', register);

router.get('/login', login);

export default router