import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const customException =
      exception instanceof HttpException
        ? exception.getResponse()
        : { status: 'Unsuccessful', message: 'Internal Server Error' };

    response.status(status).json({
      statusCode: status,
      exception: customException,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
