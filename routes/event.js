import express from 'express';
import { createEvent, joinEvent } from '../controllers/event.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.post('/join', authMiddleware, joinEvent);

export default router;
