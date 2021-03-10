import { Injectable } from '@nestjs/common';
import { IUser } from './interface/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { HttpExceptionClass } from './helpers/users.httpexception';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('TwitterUser') private readonly userModel: Model<IUser>,
  ) {}

  public async getUsers(): Promise<UserDto[]> {
    const users = await this.userModel.find();
    if (!users.length) {
      throw new HttpExceptionClass(
        { status: 'Unsuccessful', message: 'Users Data not Found.' },
        404,
      );
    }
    return users;
  }

  public async getUserById(id: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ userId: id });
    if (!user) {
      throw new HttpExceptionClass(
        { status: 'Unsuccessful', message: `User with Id #${id} not Found.` },
        404,
      );
    }
    return user;
  }

  public async postUser(newUser: UserDto): Promise<UserDto> {
    const user = await new this.userModel(newUser).save();
    if (!user) {
      throw new HttpExceptionClass(
        {
          status: 'Unsuccessful',
          message: 'Internal Error, User Signup Failed.',
        },
        500,
      );
    }
    return user;
  }
}
