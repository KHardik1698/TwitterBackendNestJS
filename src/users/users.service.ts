import { Injectable, HttpException } from '@nestjs/common';
import { IUser } from './interface/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('TwitterUser') private readonly userModel: Model<IUser>,
  ) {}

  public async getUsers(): Promise<UserDto[]> {
    const users = await this.userModel.find().exec();
    if (!users) {
      throw new HttpException('Not Found', 404);
    }
    return users;
  }

  public async postUser(newUser: UserDto) {
    const user = await new this.userModel(newUser);
    return user.save();
  }
}
