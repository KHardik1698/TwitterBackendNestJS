import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/users.interface';

@Injectable()
export class IsUserRegisteredMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('TwitterUser') private readonly userModel: Model<IUser>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.userModel.findOne({ email: req.body.email }).exec();
    if (user) {
      throw new HttpException(
        `Email Id ${req.body.email} is already Registered. Please Login.`,
        401,
      );
    }
    next();
  }
}
export class MatchPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.password !== req.body.confirmPassword) {
      throw new HttpException(
        `Password & Confirm Password don't match. Please try again.`,
        400,
      );
    }
    next();
  }
}
