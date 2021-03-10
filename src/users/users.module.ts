import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import {
  IsUserRegistered,
  MatchPassword,
  CreatePasswordHash,
  AddInternalData,
  AppLoggerMiddleware,
} from './users.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TwitterUser',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppLoggerMiddleware)
      .forRoutes('*')
      .apply(
        IsUserRegistered,
        MatchPassword,
        CreatePasswordHash,
        AddInternalData,
      )
      .forRoutes('/users/signup');
  }
}
