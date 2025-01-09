import Location from '../models/location.js';

// Create a new location
export const createLocation = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: 'Name and type are required' });
    }

    const existingLocation = await Location.findOne({ name });
    if (existingLocation) {
      return res.status(400).json({ message: 'Location already exists' });
    }

    const newLocation = new Location({ name, type });
    await newLocation.save();

    res.status(201).json({ message: 'Location created successfully', location: newLocation });
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Search locations
export const searchLocations = async (req, res) => {
  try {
    const { query, type } = req.query;

    const searchCriteria = {};
    if (query) searchCriteria.name = { $regex: query, $options: 'i' }; // Case-insensitive match
    if (type) searchCriteria.type = type;

    const locations = await Location.find(searchCriteria).populate('posts');

    res.status(200).json(locations);
  } catch (error) {
    console.error('Error searching locations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
