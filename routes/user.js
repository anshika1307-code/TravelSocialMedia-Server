import express from 'express';
import { getUserProfile, followUser, unfollowUser } from '../controllers/user.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.get('/profile/:id', authMiddleware, getUserProfile);
router.post('/follow/:id', authMiddleware, followUser);
router.post('/unfollow/:id', authMiddleware, unfollowUser);

export default router;
