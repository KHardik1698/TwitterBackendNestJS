import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userId: String,
  email: String,
  username: String,
  password: String,
  createdAt: Date,
});
