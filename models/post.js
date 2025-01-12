import { Schema, model } from 'mongoose';

// // const PostSchema = new Schema({
// //   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// //   caption: { type: String, required: false },
// //   image: { type: String, required: true }, // Image or video URL
// //   mainLocation: { type: String, required: true }, // Main location (e.g., "Manali")
// //   subLocations: [
// //     {
// //       name: { type: String, required: true }, // e.g., "Solang Valley", "ABC Hotel"
// //       type: { type: String, enum: ['hotel', 'restaurant', 'place'], required: true }, // Type of sub-location
// //       cost: { type: Number, required: false }, // Cost associated with this sub-location
// //       rating: { type: Number, min: 0, max: 5, required: false }, // User's rating for this sub-location
// //     },
// //   ],
// //   overallRating: { type: Number, min: 0, max: 5, required: false }, // Calculated average of sub-location ratings
// //   duration: { type: String, required: false }, // Trip duration (e.g., "3 days")
// //   cost: { type: Number, required: false }, // Overall cost of the trip
// //   tags: { type: [String], default: [] }, // Tags for search (e.g., "adventure", "budget")
// //   likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }, // Users who liked the post
// //   comments: { type: [Schema.Types.ObjectId], ref: 'Comment', default: [] }, 
// //   createdAt: { type: Date, default: Date.now },
// // });



// const PostSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   caption: { type: String, required: false },
//   media: [{ type: String, required: true }], // Array of media URLs (images/videos)
//   mainLocation: { type: String, required: true },
//   subLocations: [
//     {
//       name: { type: String, required: true },
//       type: { type: String, enum: ['hotel', 'restaurant', 'place'], required: true },
//       cost: { type: Number, required: false },
//       rating: { type: Number, min: 0, max: 5, required: false },
//     },
//   ],
//   overallRating: { type: Number, min: 0, max: 5, required: false },
//   duration: { type: String, required: false },
//   cost: { type: Number, required: false },
//   tags: { type: [String], default: [] },
//   recommendation: { type: String, required: false },
//   expenses: [
//     {
//       name: { type: String, required: false },
//       cost: { type: Number, required: false },
//     },
//   ],
//   likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
//   comments: { type: [Schema.Types.ObjectId], ref: 'Comment', default: [] },
//   createdAt: { type: Date, default: Date.now },
// });
// export default model('Post', PostSchema);

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String, required: false },
  media: [{ type: String, required: true }],
  mainLocation: { type: String, required: true },
  subLocations: [
    {
      name: { type: String, required: true },
      type: { type: String, enum: ['hotel', 'restaurant', 'place','beach'], required: true },
      cost: { type: Number, required: false },
      rating: { type: Number, min: 0, max: 5, required: false },
    },
  ],
  overallRating: { type: Number, min: 0, max: 5, required: false },
  duration: { type: String, required: false },
  cost: { type: Number, required: false },
  tags: { type: [String], default: [] },
  recommendation: { type: String, required: false },
  expenses: [
    {
      name: { type: String, required: false },
      cost: { type: Number, required: false },
    },
  ],
  likes: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  comments: { type: [Schema.Types.ObjectId], ref: 'Comment', default: [] },
  createdAt: { type: Date, default: Date.now },
});
export default model('Post', PostSchema);