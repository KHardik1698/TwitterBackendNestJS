import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITweet } from './interface/tweets.interface';
import { TweetDto } from './dto/tweets.dto';
import { HttpExceptionClass } from '../users/helpers/users.httpexception';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel('TwitterTweet') private readonly userModel: Model<ITweet>,
  ) {}

  public async getTweets(): Promise<TweetDto[]> {
    const tweets = await this.userModel.find({ userId: process.env.USER_ID });
    if (!tweets.length) {
      throw new HttpExceptionClass(
        { status: 'Unsuccessful', message: 'Tweets Data Not Found.' },
        404,
      );
    }
    return tweets;
  }

  public async postTweet(newTweet: TweetDto): Promise<TweetDto> {
    const tweet = await new this.userModel(newTweet).save();
    if (!tweet) {
      throw new HttpExceptionClass(
        {
          status: 'Unsuccessful',
          message: 'Internal Error, Tweet Posting Failed.',
        },
        500,
      );
    }
    return tweet;
  }

  public async deleteTweetById(id: String): Promise<TweetDto> {
    const tweet = await this.userModel.findOneAndDelete({
      userId: process.env.USER_ID,
      tweetId: id,
    });
    if (!tweet) {
      throw new HttpExceptionClass(
        {
          status: 'Unsuccessful',
          message: `Tweet with Id #${id} Not Found.`,
        },
        404,
      );
    }
    return tweet;
  }
}
