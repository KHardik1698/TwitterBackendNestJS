import { Test, TestingModule } from '@nestjs/testing';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { getModelToken } from '@nestjs/mongoose';
import { TweetDto } from './dto/tweets.dto';

describe('TweetsController', () => {
  let controller: TweetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TweetsController],
      providers: [
        TweetsService,
        {
          provide: getModelToken('TwitterTweet'),
          useValue: TweetDto,
        },
      ],
    }).compile();

    controller = module.get<TweetsController>(TweetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
