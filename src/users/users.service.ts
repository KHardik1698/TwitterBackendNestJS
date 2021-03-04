import { Injectable, HttpException } from '@nestjs/common';
import { IUser } from './interface/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import * as uniqid from 'uniqid';
import * as bcrypt from 'bcrypt';

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

  public async getUserById(id: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ id: id }).exec();
    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return user;
  }

  public async postUser(newUser: UserDto): Promise<UserDto> {
    newUser.id = uniqid();
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const user = await new this.userModel(newUser).save();
    if (!user) {
      throw new HttpException('Internal Error', 500);
    }
    return user;
  }
}
