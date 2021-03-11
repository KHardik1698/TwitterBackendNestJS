import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/users.interface';
import { HttpExceptionClass } from './helpers/users.httpexception';
import * as bcrypt from 'bcrypt';
import * as uniqid from 'uniqid';

@Injectable()
export class IsUserRegistered implements NestMiddleware {
  constructor(
    @InjectModel('TwitterUser') private readonly userModel: Model<IUser>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.userModel.findOne({ email: req.body.email }).exec();
    if (user) {
      throw new HttpExceptionClass(
        {
          status: 'Unsuccessful',
          message: `Email Id ${req.body.email} is already Registered. Please Login.`,
        },
        401,
      );
    }
    next();
  }
}

export class MatchPassword implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.password !== req.body.confirmPassword) {
      throw new HttpExceptionClass(
        {
          status: 'Unsuccessful',
          message: "Password & Confirm Password don't match. Please try again.",
        },
        400,
      );
    }
    next();
  }
}

export class CreatePasswordHash implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    let hash = await bcrypt.hash(req.body.password, 10);
    if (!hash) {
      throw new HttpExceptionClass(
        { status: 'Unsuccessful', message: 'Internal Server Error.' },
        500,
      );
    }
    req.body.password = hash;
    next();
  }
}

export class AddInternalData implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.body.userId = uniqid();
    req.body.createdAt = Date.now();
    next();
  }
}

export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const requestStart = Date.now();
    const requestId = 'req-' + uniqid();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      const responseEnd = Date.now();
      const processingTime = responseEnd - requestStart;

      this.logger.log(
        `
        Client Details: Sent from : ${userAgent}, IP Address: ${ip}.
        Request Details : Request Id: ${requestId}, ${method} Request on ${originalUrl} Route.
        Response Details: Processing Time: ${processingTime}ms, Responded with Status: ${statusCode} ${statusMessage}.
        `,
      );
    });

    next();
  }
}
