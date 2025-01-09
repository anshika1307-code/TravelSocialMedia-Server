import fetch from 'node-fetch';

export const trainRecommendationModel = async (req, res) => {
  try {
    // Collect data to send to the AI model
    const posts = [
      { id: "1", content: "Manali trekking adventure", tags: "adventure trekking", author: "user1" },
      { id: "2", content: "Shimla snowboarding experience", tags: "snowboarding winter", author: "user2" }
    ];

    const follows = [
      { user: "user1", follows: ["user2", "user3"] },
      { user: "user2", follows: ["user1"] }
    ];

    // Send data to the AI model
    const response = await fetch('http://localhost:5001/train', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ posts, follows }),
    });

    const data = await response.json();
    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error('Error training model:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
