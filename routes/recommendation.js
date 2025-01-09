import express from 'express';
import { getRecommendations } from '../controllers/recommendation.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authMiddleware, getRecommendations);

export default router;
