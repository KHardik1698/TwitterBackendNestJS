import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public async getUsers(@Res() response: Response) {
    let result = await this.userService.getUsers().then((response) => {
      return response;
    });
    if (result) {
      return response.status(200).json({
        status: 'Successful',
        data: result,
      });
    }
  }
  @Post()
  public async postUser(
    @Body() PostUserDto: UserDto,
    @Res() response: Response,
  ) {
    let result = await this.userService
      .postUser(PostUserDto)
      .then((response) => {
        return response;
      });
    if (result) {
      return response.status(200).json({
        status: 'Successful',
        data: result,
      });
    }
  }
}
