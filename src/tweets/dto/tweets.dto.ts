import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TweetDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  tweet: string;
}
