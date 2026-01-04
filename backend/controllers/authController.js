/** @format */

import { hashPassword, comparePassword } from '../services/hashService.js';
import { generateToken } from '../services/jwtService.js';
import User from '../models/user.model.js';
import crypto from 'crypto';
//Register:
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists!' });

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      username,
      email,
      passwordHash: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Login:
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    // if (!user.isVerified) {
    //   return res.status(403).json({
    //     message: 'Verify your email before logging in',
    //   });
    // }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Protected profile route
export const profile = (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
    user: req.user,
  });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.isVerified)
    return res.status(400).json({ message: 'Already verified' });

  if (user.otpExpiresAt < Date.now())
    return res.status(400).json({ message: 'OTP expired' });

  const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

  if (hashedOtp !== user.otpHash)
    return res.status(400).json({ message: 'Invalid OTP' });

  user.isVerified = true;
  user.otpHash = undefined;
  user.otpExpiresAt = undefined;

  await user.save();

  return res.json({ message: 'Account verified successfully' });
};

export const logout = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
    .status(200)
    .json({ message: 'Logged out successfully' });
};


export default {
  register,
  login,
  profile,
  verifyOtp,
  logout
};
