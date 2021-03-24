import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';
import { getModelToken } from '@nestjs/mongoose';
import { TweetDto } from './dto/tweets.dto';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TweetsService,
        {
          provide: getModelToken('TwitterTweet'),
          useValue: TweetDto,
        },
      ],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
