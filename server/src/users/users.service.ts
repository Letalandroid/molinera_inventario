import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  UserChangeIsActive,
  UserChangeRole,
  UserData,
} from '../../src/models/User';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  getAllUsers() {
    return this.prismaService.user.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        Profile: true,
      },
    });
  }

  getProfileById(id: number) {
    return this.prismaService.profile.findUnique({
      where: { user_id: id },
    });
  }

  async changeIsActive(id: number, user: UserChangeIsActive) {
    if (!id) {
      throw new NotFoundException({
        status: 404,
        message: 'User not found',
      });
    }

    const u = await this.prismaService.user.update({
      where: { id },
      data: { isActive: user.isActive || false },
    });

    if (!u) {
      throw new NotFoundException({
        status: 404,
        message: 'User not found',
      });
    }

    return {
      status: 200,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
    };
  }

  async changeRole(id: number, user: UserChangeRole) {
    try {
      if (!id) {
        throw new NotFoundException({
          status: 404,
          message: 'User not found',
        });
      }

      const u = await this.prismaService.user.update({
        where: { id: user.id },
        data: { role: user.role },
      });

      if (!u) {
        throw new NotFoundException({
          status: 404,
          message: 'User not found',
        });
      }

      return {
        status: 200,
        message: `User role changed to ${user.role} successfully`,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new NotFoundException({
          status: 404,
          message: `Invalid role: ${user.role}`,
        });
      }

      throw new NotFoundException({
        status: 404,
        message: 'User not found',
      });
    }
  }

  async updateData(id: number, user: UserData) {
    try {
      if (!id || !user.role) {
        throw new NotFoundException({
          status: 404,
          message: 'User not found',
        });
      }

      const u = await this.prismaService.user.update({
        where: { id },
        data: {
          role: user.role ?? Role.ADMINISTRADOR,
          isActive: user.isActive ?? false,
        },
      });

      if (!u) {
        throw new NotFoundException({
          status: 404,
          message: 'User not found',
        });
      }

      return {
        status: 200,
        message: `User role changed to ${user.role} successfully`,
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new NotFoundException({
          status: 404,
          message: `Invalid role: ${user.role}`,
        });
      }

      throw new NotFoundException({
        status: 404,
        message: 'User not found',
        error
      });
    }
  }
}
