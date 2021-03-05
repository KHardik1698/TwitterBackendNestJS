import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';
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
    return response.status(200).json({
      status: 'Successful',
      data: result,
    });
  }

  @Get(':id')
  public async getUserById(@Res() response: Response, @Param('id') id: string) {
    let result = await this.userService.getUserById(id).then((response) => {
      return response;
    });
    return response.status(200).json({
      status: 'Successful',
      data: result,
    });
  }

  @Post('/signup')
  public async signUpUser(
    @Body() PostUserDto: UserDto,
    @Res() response: Response,
  ) {
    let result = await this.userService
      .postUser(PostUserDto)
      .then((response) => {
        return response;
      });
    return response.status(200).json({
      status: 'Successful',
      data: result,
    });
  }
}

// if (result) {
//   return response.status(200).json({
//     status: 'Successful',
//     data: result,
//   });
// } else {
//   return response.status(500).json({
//     status: 'Unsuccessful',
//     message: 'Signup Failed.',
//   });
// }
