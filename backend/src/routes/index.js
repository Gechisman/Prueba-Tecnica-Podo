import express from 'express'

import authRoutes from './auth/index.js';
import contractsRoutes from './contracts/index.js';
import checkNotAuth from '../middlewares/checkNotAuth.js';

const router = express.Router()

router.get('/', checkNotAuth, (req, res) => {
  res.redirect('/auth/login');
});

router.use('/auth', authRoutes);
router.use('/contracts', contractsRoutes);

export default router