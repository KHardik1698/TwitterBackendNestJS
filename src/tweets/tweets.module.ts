import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchema } from './schemas/tweets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TwitterTweet',
        schema: TweetSchema,
      },
    ]),
  ],
  providers: [TweetsService],
  controllers: [TweetsController],
})
export class TweetsModule {}
