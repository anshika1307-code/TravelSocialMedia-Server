const NotificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User receiving the notification
    type: { type: String, enum: ['like', 'comment', 'follow', 'mention'], required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User triggering the notification
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: false }, // Optional post reference
    message: { type: String, default: '' }, // Custom message
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  });
  
  export default model('Notification', NotificationSchema);
  