import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchema } from './schemas/tweets.schema';
import { AddInternalData } from './tweets.middleware';

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
export class TweetsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddInternalData).forRoutes('/tweets/post');
  }
}
