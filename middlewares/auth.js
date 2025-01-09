import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }
  
    try {
        console.log('Token Received:', token); // Debug log
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Payload:', decoded); // Debug log
        req.user = decoded; // Add user info to request object
        next();
    } catch (error) {
      res.status(403).json({ message: 'Authentication failed: Invalid token' });
    }
  };
  
  export default authMiddleware;
  