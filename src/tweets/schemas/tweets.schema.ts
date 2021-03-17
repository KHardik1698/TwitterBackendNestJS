import * as mongoose from 'mongoose';

export const TweetSchema = new mongoose.Schema({
  userId: String,
  tweetId: String,
  tweet: String,
  postedAt: Date,
});
