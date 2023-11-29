import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
