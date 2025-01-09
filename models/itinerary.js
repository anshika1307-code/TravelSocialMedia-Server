import { Schema, model } from 'mongoose';
const ItinerarySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    days: [
      {
        date: { type: Date, required: true },
        activities: { type: [String], required: true }, // List of activities
        places: { type: [Schema.Types.ObjectId], ref: 'Location' }, // Places visited
      },
    ],
    createdAt: { type: Date, default: Date.now },
  });
  
  export default model('Itinerary', ItinerarySchema);
  