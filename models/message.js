const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    image: { type: String, required: false }, // Optional image URL
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  });
  
  export default model('Message', MessageSchema);
  