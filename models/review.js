import { Schema, model } from 'mongoose';
const ReviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    comment: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
  });
  
  export default model('Review', ReviewSchema);
   