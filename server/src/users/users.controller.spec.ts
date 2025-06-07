
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;
  let jwtService: JwtService;

  const mockUsers = [
    { id: 1, name: 'Test User', email: 'test@example.com', role: Role.CLIENTE },
  ];

  const jwtServiceMock = {
    verify: jest.fn(),
  };

  const userServiceMock = {
    getAllUsers: jest.fn().mockResolvedValue(mockUsers),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        PrismaService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users if token is valid and role is GERENTE', async () => {
    jwtServiceMock.verify.mockReturnValueOnce({ role: Role.GERENTE });

    const result = await controller.getAllUsers('Bearer valid-token');
    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

});
