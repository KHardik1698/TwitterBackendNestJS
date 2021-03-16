import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HttpExceptionClass } from '../users/helpers/users.httpexception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpExceptionClass(
        {
          status: 'Unsuccessful',
          message: 'Password is Incorrect. Please try again.',
        },
        400,
      );
    }
    return user;
  }
}
