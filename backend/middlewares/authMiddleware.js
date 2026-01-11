/** @format */

import { verifyToken } from '../services/jwtService.js';
import User from '../models/user.model.js'
const authMiddleware = async(req, res, next) => {
  const token = req.cookies?.token;

if (!token) {
  return res.status(401).json({ message: 'No token provided' });
}
  if (!token) {
    return res.status(401).json({ message: 'Malformed token' });
  }
  // if (!req.user.isVerified) {
  //   return res.status(403).json({ message: 'Account not verified' });
  // }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select(
      "_id name avatarUrl role"
    );

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
