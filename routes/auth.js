import express from 'express';
import { signup , login} from '../controllers/auth.js';
import upload from '../middlewares/upload.js';
import { getUserProfile } from '../controllers/user.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();

router.post('/signup', upload.single('profilePic'), signup);
router.post('/login', login);
router.get('/profile', authMiddleware, getUserProfile);

export default router;
