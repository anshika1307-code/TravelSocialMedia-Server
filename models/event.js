import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the event
  title: { type: String, required: true }, // Event title (e.g., "Manali Trek Meetup")
  description: { type: String, required: true }, // Event description
  location: { type: String, required: true }, // Event location (e.g., "Solang Valley, Manali")
  coordinates: { lat: Number, lng: Number }, // Event's geographical location
  date: { type: Date, required: true }, // Event date
  attendees: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }, // Users attending the event
  maxAttendees: { type: Number, required: false }, // Maximum number of attendees (optional)
  image: { type: String, required: false }, // Event cover image
  tags: { type: [String], default: [] }, // Tags for search (e.g., "trekking", "festival")
  createdAt: { type: Date, default: Date.now },
});

export default model('Event', EventSchema);
