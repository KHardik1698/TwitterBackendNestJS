import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserDto {
  id: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
