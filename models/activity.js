import { Schema, model } from 'mongoose';
const ActivitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User performing the activity
    type: { type: String, enum: ['trip', 'like', 'event', 'search'], required: true }, // Activity type
    target: { type: Schema.Types.ObjectId, refPath: 'targetModel', required: true }, // The related model (e.g., Post, Location, Event)
    targetModel: { type: String, required: true }, // Reference to the related model (e.g., "Post", "Location", "Event")
    metadata: { type: Map, of: String, default: {} }, // Additional details (e.g., search terms, tags)
    createdAt: { type: Date, default: Date.now },
  });
  
  export default model('Activity', ActivitySchema);
  