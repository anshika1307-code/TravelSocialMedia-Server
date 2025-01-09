import express from 'express';
import { createFlag, getFlags } from '../controllers/flag.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createFlag);
router.get('/', authMiddleware, getFlags);

export default router;
