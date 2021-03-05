import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersController, UserSignupController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import {
  IsUserRegistered,
  MatchPassword,
  CreatePasswordHash,
  AddInternalData,
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
  controllers: [UsersController, UserSignupController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        IsUserRegistered,
        MatchPassword,
        CreatePasswordHash,
        AddInternalData,
      )
      .forRoutes(UserSignupController);
  }
}
