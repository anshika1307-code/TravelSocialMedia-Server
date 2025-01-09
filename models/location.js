import { Schema, model } from 'mongoose';
const LocationSchema = new Schema({
    name: { type: String, required: true, unique: true }, // Location name (e.g., "Manali", "ABC Hotel")
    type: { type: String, enum: ['city', 'hotel', 'restaurant', 'place'], required: true }, // Type of location
    averageRating: { type: Number, min: 0, max: 5, default: 0 }, // Aggregated rating
    totalRatings: { type: Number, default: 0 }, // Total number of ratings
    posts: { type: [Schema.Types.ObjectId], ref: 'Post', default: [] }, // Related posts
    createdAt: { type: Date, default: Date.now },
  });
  
  export default model('Location', LocationSchema);
  