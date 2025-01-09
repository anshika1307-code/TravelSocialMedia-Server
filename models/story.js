const StorySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true }, // Image or video URL
    caption: { type: String, default: '' },
    viewers: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }, // Users who viewed the story
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }, // Expiry in 24 hours
  });
  
  export default model('Story', StorySchema);
  