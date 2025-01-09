import { Schema, model } from 'mongoose';
// import { genSalt, hash } from 'bcryptjs';
import pkg from 'bcryptjs';
const { genSalt, hash } = pkg;


const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: false },
  followers: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }, // Array of user IDs
  following: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }, // Array of user IDs
  posts: { type: Number, default: 0 }, // Post count
  bio: { type: String, default: '' },  
  savedPosts: { type: [Schema.Types.ObjectId], ref: 'Post', default: [] }, // Saved posts
  isVerified: { type: Boolean, default: false }, // Verification badge
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

export default model('User', UserSchema);
