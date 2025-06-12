import express from 'express'

import authRoutes from './auth/index.js';
import contractsRoutes from './contracts/index.js';

const router = express.Router()

router.use('/auth', authRoutes);
router.use('/contracts', contractsRoutes);

export default router