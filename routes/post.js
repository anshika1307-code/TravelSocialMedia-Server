// import express from 'express';
// import { createPost } from '../controllers/post.js';
// import authMiddleware from '../middlewares/auth.js';

// const router = express.Router();

// router.post('/', authMiddleware, createPost);

// export default router;


// // import express from 'express';
// // import { createPost } from '../controllers/post.js';
// // import authMiddleware from '../middlewares/auth.js';
// // import upload from '../middlewares/upload.js';

// // const router = express.Router();

// // // POST request to create a post with multiple media files
// // router.post('/', authMiddleware, upload.array('media', 5), createPost);

// // export default router;


import express from 'express';
import { createPost } from '../controllers/post.js';
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

export default router;
