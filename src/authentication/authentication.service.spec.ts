import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserDto } from '../users/dto/users.dto';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthenticationService,
        UsersService,
        {
          provide: getModelToken('TwitterUser'),
          useValue: UserDto,
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
