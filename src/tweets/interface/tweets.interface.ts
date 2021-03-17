import { Document } from 'mongoose';

export interface ITweet extends Document {
  readonly tweet: string;
}
