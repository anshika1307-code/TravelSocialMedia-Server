import RecommendationData from '../models/recommendation.js';

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    const recommendations = await RecommendationData.find({ user: userId })
      .sort({ score: -1 })
      .populate('location');

    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// import fetch from 'node-fetch';

// export const getRecommendations = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userActivityData = { userId, type: 'recommendation' }; // Example payload

//     // Call AI model API for recommendations
//     const response = await fetch('http://localhost:5000/recommend', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(userActivityData),
//     });

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching recommendations:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
