import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserDto } from './dto/users.dto';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from '../authentication/authentication.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: getModelToken('TwitterUser'),
          useValue: UserDto,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
