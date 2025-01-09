import Event from '../models/event.js';

export const createEvent = async (req, res) => {
  try {
    const { organizer, title, description, location, date, maxAttendees, image, tags } = req.body;

    const event = new Event({ organizer, title, description, location, date, maxAttendees, image, tags });
    await event.save();

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const joinEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    const event = await Event.findByIdAndUpdate(eventId, { $push: { attendees: userId } }, { new: true });

    res.status(200).json({ message: 'Joined event successfully', event });
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
