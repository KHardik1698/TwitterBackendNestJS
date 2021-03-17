import { IsNotEmpty, IsString } from 'class-validator';

export class TweetDto {
  @IsNotEmpty()
  @IsString()
  tweet: string;
}
