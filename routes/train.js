import express from 'express';
import { trainRecommendationModel } from '../controllers/trainModel.js';

const router = express.Router();

router.post('/train', trainRecommendationModel);

export default router;
