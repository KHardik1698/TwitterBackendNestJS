import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

const mockUserData = {
  _id: '604601b1736d924a8c4a2196',
  firstname: 'Mr.',
  lastname: 'Administrator',
  username: 'admin',
  email: 'admin@gmail.com',
  password: '$2b$10$eM6t6QWNTSg6ewrkLjUU.u0DJsu7zBUraJIUbQ8KIOf/0SwFh5EF2',
  userId: '2pbz9rieq4km0gscct',
  createdAt: '2021-03-08T10:51:29.548Z',
  __v: 0,
};

const mockPostUserData = {
  firstname: 'Mr.',
  lastname: 'Administrator',
  username: 'admin',
  email: 'admin@gmail.com',
  password: 'admin123',
  confirmPassword: 'admin123',
};

class mockRepository {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue([mockUserData]);
  static findOne = jest.fn().mockResolvedValue(mockUserData);
  static findOneAndDelete = jest.fn().mockResolvedValue(mockUserData);
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('TwitterUser'),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of all users', async () => {
    return await service.getUsers().then((data) => {
      expect(data).toStrictEqual([mockUserData]);
    });
  });

  it('should return error if users not present in array of all users', async () => {
    return await service.getUsers().catch((err) => {
      expect(err).toThrowError();
    });
  });

  it('should return a single user', async () => {
    return await service.getUserById('2pbz9rieq4km0gscct').then((data) => {
      expect(data).toStrictEqual(mockUserData);
    });
  });

  it('should return error if user not present', async () => {
    return await service.getUserById('2pbz9rieq4km0gscct').catch((err) => {
      expect(err).toThrowError();
    });
  });

  it('should save a single user', async () => {
    return await service.postUser(mockPostUserData).then((data) => {
      expect(data).toStrictEqual(mockPostUserData);
    });
  });

  it('should return error if a user is not saved', async () => {
    return await service.postUser(mockPostUserData).catch((err) => {
      expect(err).toThrowError();
    });
  });

  it('should delete a single user', async () => {
    return await service.deleteUserById('2pbz9rieq4km0gscct').then((data) => {
      expect(data).toStrictEqual(mockUserData);
    });
  });

  it('should return error if user not present', async () => {
    return await service.deleteUserById('2pbz9rieq4km0gscct').catch((err) => {
      expect(err).toThrowError();
    });
  });
});
