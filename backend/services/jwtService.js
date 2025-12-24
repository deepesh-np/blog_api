/** @format */

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_KEY);
};
