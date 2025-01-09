import Post from '../models/post.js';
import Location from '../models/location.js';

// export const createPost = async (req, res) => {
//   try {
//     const { user, caption, image, mainLocation, subLocations, cost, duration, tags } = req.body;

//     const post = new Post({ user, caption, image, mainLocation, subLocations, cost, duration, tags });
//     await post.save();

//     // Add post reference to the main location
//     const location = await Location.findOneAndUpdate(
//       { name: mainLocation },
//       { $push: { posts: post._id } },
//       { new: true, upsert: true }
//     );

//     res.status(201).json({ message: 'Post created successfully', post });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// export const createPost = async (req, res) => {
//   try {
//     const {
//       user,
//       caption,
//       media,
//       mainLocation,
//       subLocations,
//       cost,
//       duration,
//       tags,
//       recommendation,
//       expenses,
//     } = req.body;

//     // Create a new post
//     const post = new Post({
//       user,
//       caption,
//       media,
//       mainLocation,
//       subLocations,
//       cost,
//       duration,
//       tags,
//       recommendation,
//       expenses,
//     });

//     await post.save();

//     // Add post reference to the main location
//     const location = await Location.findOneAndUpdate(
//       { name: mainLocation },
//       { $push: { posts: post._id } },
//       { new: true, upsert: true }
//     );

//     res.status(201).json({ message: 'Post created successfully', post });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

export const createPost = async (req, res) => {
  try {
    const {
      user,
      caption,
      mainLocation,
      subLocations,
      cost,
      duration,
      tags,
      recommendation,
      expenses,
    } = req.body;

    // Get Cloudinary URLs from the uploaded files
    const media = req.files.map((file) => file.path);

    // Create a new post
    const post = new Post({
      user,
      caption,
      media,
      mainLocation,
      subLocations,
      cost,
      duration,
      tags,
      recommendation,
      expenses,
    });

    await post.save();

    // Add post reference to the main location
    const location = await Location.findOneAndUpdate(
      { name: mainLocation },
      { $push: { posts: post._id } },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const searchPosts = async (req, res) => {
  try {
    const { location, tags } = req.query;

    const searchCriteria = {};
    if (location) searchCriteria.mainLocation = { $regex: location, $options: 'i' };
    if (tags) searchCriteria.tags = { $in: tags.split(',') };

    const posts = await Post.find(searchCriteria).populate('user', 'username profilePic');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
