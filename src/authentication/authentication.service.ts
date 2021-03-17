import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HttpExceptionClass } from '../users/helpers/users.httpexception';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
