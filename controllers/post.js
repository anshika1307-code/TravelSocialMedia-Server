import Post from '../models/post.js';
import Location from '../models/location.js';
import User from '../models/user.js';


export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId })
      .populate('user', 'username profilePic')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getTimelinePosts = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the list of users the current user is following
    const user = await User.findById(userId).populate('following', '_id');
    const followingIds = user.following.map((follow) => follow._id);

    // Fetch posts from the current user and their following
    const posts = await Post.find({ user: { $in: [userId, ...followingIds] } })
      .populate('user', 'username profilePic')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching timeline posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ message: isLiked ? 'Post unliked' : 'Post liked' });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Comment on a post
export const commentOnPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user: userId, comment });
    await post.save();

    res.status(201).json({ message: 'Comment added', post });
  } catch (error) {
    console.error('Error commenting on post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the user is the owner of the post
    if (post.user.toString() !== userId)
      return res.status(403).json({ message: 'Unauthorized' });

    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

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


