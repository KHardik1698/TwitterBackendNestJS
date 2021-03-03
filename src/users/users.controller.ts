import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }
  @Post()
  public postUser(@Body() UserDto: UserDto) {
    this.userService.postUser(UserDto);
  }
}
