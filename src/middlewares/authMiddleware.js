import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.userId = decoded.id; // Assuming the token contains the user ID
    next();
  });
};

export default authMiddleware;