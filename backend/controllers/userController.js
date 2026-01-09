/** @format */

import User from '../models/user.model.js';

export const updateAvatar = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { avatarUrl } = req.body;

    if (!avatarUrl) {
      return res.status(400).json({ message: 'avatarUrl is required' });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatarUrl = avatarUrl;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Avatar updated successfully',
      avatarUrl: user.avatarUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const DEFAULT_AVATAR =
  'https://pfpzone.com/wp-content/uploads/2025/08/default-pfp-3.webp';

export const getUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findById(user_id).select(
      'name username email bio avatarUrl role createdAt followers following'
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAvatar = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findById(user_id).select('avatarUrl');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      avatarUrl: user.avatarUrl || DEFAULT_AVATAR,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, bio, avatarUrl } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  getUser,
  getAvatar,
  updateAvatar,
  updateProfile,
};
