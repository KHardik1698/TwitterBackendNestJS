import {
  Module,
  NestModule,
  MiddlewareConsumer,
  forwardRef,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import {
  IsUserRegistered,
  MatchPassword,
  CreatePasswordHash,
  AddInternalData,
  UpdateUserData,
  AppLoggerMiddleware,
} from './users.middleware';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TwitterUser',
        schema: UserSchema,
      },
    ]),
    forwardRef(() => AuthenticationModule),
  ],
  exports: [UsersService],
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
      .forRoutes('/users/signup')
      .apply(IsUserRegistered, UpdateUserData)
      .forRoutes('/users/update/:id');
  }
}
