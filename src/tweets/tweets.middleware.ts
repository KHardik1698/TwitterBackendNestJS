import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as uniqid from 'uniqid';

@Injectable()
export class AddInternalData implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.body.tweetId = uniqid();
    req.body.userId = process.env.USER_ID;
    req.body.postedAt = Date.now();
    next();
  }
}
