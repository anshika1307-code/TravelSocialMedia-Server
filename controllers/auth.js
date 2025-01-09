import User from '../models/user.js';
import { uploader } from '../config/cloudinary.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validate required fields
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Upload profile picture to Cloudinary if provided
    let profilePicUrl = null;
    if (req.file) {
      const uploadResult = await uploader.upload(req.file.path, {
        folder: 'profile_pics',
        resource_type: 'image', // Ensure only images are allowed
      });
      profilePicUrl = uploadResult.secure_url;
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password, // Password is hashed in the model's pre-save middleware
      profilePic: profilePicUrl,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, username: newUser.username, email: newUser.email, profilePic: newUser.profilePic } });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respond with user data and token
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
      token,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
