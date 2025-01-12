

import express from 'express';
import {
  createPost,
  getUserPosts,
  getTimelinePosts,
  likePost,
  commentOnPost,
  deletePost,
} from '../controllers/post.js';
import authMiddleware from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// POST request to create a post with media files
router.post(
  '/',
  authMiddleware,
  (req, res, next) => {
    req.folder = 'post_media'; // Set folder for post media
    next();
  },
  upload.array('media', 5), // Allow up to 5 files
  createPost
);

// GET request to fetch posts of a specific user
router.get('/user/:userId', authMiddleware, getUserPosts);

// GET request to fetch posts for a user's timeline (including posts of people they follow)
router.get('/timeline', authMiddleware, getTimelinePosts);

// PATCH request to like/unlike a post
router.patch('/:postId/like', authMiddleware, likePost);

// POST request to add a comment to a post
router.post('/:postId/comment', authMiddleware, commentOnPost);

// DELETE request to delete a post
router.delete('/:postId', authMiddleware, deletePost);

export default router;
