import Flag from '../models/flag.js';

export const createFlag = async (req, res) => {
  try {
    const { user, location, coordinates } = req.body;

    const flag = new Flag({ user, location, coordinates });
    await flag.save();

    res.status(201).json({ message: 'Flag created successfully', flag });
  } catch (error) {
    console.error('Error creating flag:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getFlags = async (req, res) => {
  try {
    const { user } = req.query;

    const flags = await Flag.find({ user }).populate('posts', 'caption image');
    res.status(200).json(flags);
  } catch (error) {
    console.error('Error fetching flags:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
