// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary.js';

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'profile_pics',
//     allowed_formats: ['jpeg', 'png', 'jpg'],
//   },
// });



// const upload = multer({ storage });

// export default upload;

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Reusable Cloudinary Storage with dynamic folder
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folderName = req.folder || 'general_uploads'; // Default folder if not specified
    return {
      folder: folderName,
      allowed_formats: ['jpeg', 'png', 'jpg', 'mp4'],
      resource_type: file.mimetype.startsWith('video') ? 'video' : 'image', // Handle images and videos
    };
  },
});

const upload = multer({ storage });

export default upload;
