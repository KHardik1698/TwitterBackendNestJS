import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from '../authentication/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/get')
  public async getUsers(@Res() response: Response) {
    let result = await this.userService.getUsers().then((response) => {
      return response;
    });
    return response.status(200).json({
      status: 'Successful',
      data: result,
    });
  }

  @Get('get/:id')
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

  @Delete('/delete/:id')
  public async deleteUserById(
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    let result = await this.userService.deleteUserById(id).then((response) => {
      return response;
    });
    return response.status(200).json({
      status: 'Successful',
      data: result,
    });
  }

  @Put('/update/:id')
  public async updateUserById(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    let result = await this.userService
      .updateUserById(id, UpdateUserDto)
      .then((response) => {
        return response;
      });
    return response.status(200).json({
      status: 'Successful',
      data: result,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public async loginUser(@Req() request: Request, @Res() response: Response) {
    return response.status(200).json({
      status: 'Login Successful',
      data: request.user,
    });
  }
}
