/** @format */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    avatarUrl: {
      type: String,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },

    otpHash: String,
    otpExpiresAt: Date,
  },
  { timestamps: true }
);

// // Pre-save middleware for hashing password
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); // only hash if password changed
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

export default mongoose.model('User', userSchema);
