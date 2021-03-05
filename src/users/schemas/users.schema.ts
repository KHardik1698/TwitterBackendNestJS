import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userId: String,
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  createdAt: Date,
});
