import { HttpException } from '@nestjs/common';

export class HttpExceptionClass extends HttpException {
  constructor(
    message: { status: String; message: String },
    statusCode: number,
  ) {
    super(message, statusCode);
  }
}
