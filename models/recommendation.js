import { Schema, model } from 'mongoose';
const RecommendationDataSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    score: { type: Number, default: 0 }, // Score based on user interaction with the location
  });
  
  export default model('RecommendationData', RecommendationDataSchema);
  