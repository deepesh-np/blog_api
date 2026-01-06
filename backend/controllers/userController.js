/** @format */

import User from '../models/user.model';

export const updateAvatar = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { avatarUrl } = req.body;

    if (!avatarUrl) {
      return res.status(400).json({ message: "avatarUrl is required" });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.avatarUrl = avatarUrl;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      avatarUrl: user.avatarUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const DEFAULT_AVATAR =
  "https://pfpzone.com/wp-content/uploads/2025/08/default-pfp-3.webp";

export const getAvatar = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findById(user_id).select("avatarUrl");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      avatarUrl: user.avatarUrl || DEFAULT_AVATAR,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
