import { Schema, model } from 'mongoose';
const FlagSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true }, // Location name (e.g., "Manali")
    coordinates: { lat: Number, lng: Number }, // Geographical coordinates
    posts: { type: [Schema.Types.ObjectId], ref: 'Post', default: [] }, // Posts related to the flag
    createdAt: { type: Date, default: Date.now },
  });
  
  export default model('Flag', FlagSchema);
  