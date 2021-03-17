import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { Request, Response } from 'express';
import { TweetDto } from './dto/tweets.dto';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@Controller('tweets')
export class TweetsController {
  constructor(private tweetService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  public async getUsers(@Res() response: Response) {
    let result = await this.tweetService.getTweets().then((response) => {
      return response;
    });
    return response.status(200).json({
      status: 'Successful',
      data: result,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/post')
  public async postTweet(
    @Body() PostTweetDto: TweetDto,
    @Res() response: Response,
  ) {
    let result = await this.tweetService
      .postTweet(PostTweetDto)
      .then((response) => {
        return response;
      });
    return response.status(200).json({
      status: 'Successful',
      data: result,
    });
  }
}
