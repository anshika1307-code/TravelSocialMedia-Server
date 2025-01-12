
import User from '../models/user.js';

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate('followers', 'username profilePic') // Populate followers
      .populate('following', 'username profilePic'); // Populate following

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      followersCount: user.followers.length,
      followingCount: user.following.length,
      posts: user.posts,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const followUser = async (req, res) => {
    try {
      const { id } = req.params; // ID of the user to follow
      const userId = req.user.id; // Logged-in user's ID
  
      if (id === userId) {
        return res.status(400).json({ message: "You can't follow yourself" });
      }
  
      const userToFollow = await User.findById(id);
      const currentUser = await User.findById(userId);
  
      if (!userToFollow || !currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!userToFollow.followers.includes(userId)) {
        userToFollow.followers.push(userId);
        currentUser.following.push(id);
        await userToFollow.save();
        await currentUser.save();
      }
       // Example: Send follower data to an AI model for influence predictions
      res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
      console.error('Error following user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export const unfollowUser = async (req, res) => {
    try {
      const { id } = req.params; // ID of the user to unfollow
      const userId = req.user.id; // Logged-in user's ID
  
      const userToUnfollow = await User.findById(id);
      const currentUser = await User.findById(userId);
  
      if (!userToUnfollow || !currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      userToUnfollow.followers = userToUnfollow.followers.filter((follower) => follower.toString() !== userId);
      currentUser.following = currentUser.following.filter((followed) => followed.toString() !== id);
  
      await userToUnfollow.save();
      await currentUser.save();
  
      res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
      console.error('Error unfollowing user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  