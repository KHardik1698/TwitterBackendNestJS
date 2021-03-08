import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
