import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  UserChangeIsActive,
  UserChangeRole,
  UserData,
} from '../../src/models/User';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: JwtService,
  ) {}

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

  getProfileById(id: number, @Req() req) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token no proporcionado o formato inválido.',
      );
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = this.jwt.verify(token);

      if (payload.userId != id) {
        throw new UnauthorizedException({
          message: 'No tienes permiso para acceder a este recurso.',
        });
      }

      return this.prismaService.profile.findUnique({
        where: { user_id: id },
      });
    } catch (err) {
      if (err instanceof ForbiddenException) {
        throw err;
      }

      throw new UnauthorizedException({
        message: 'Token inválido o expirado.',
        error: err,
      });
    }
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

  async updateData(id: number, user: UserData, @Req() req) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Token no proporcionado o formato inválido.',
        );
      }

      const token = authHeader.replace('Bearer ', '');

      const { userId, email } = this.jwt.decode(token);

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

      await this.prismaService.auditLog.create({
        data: {
          userId,
          action: `Actualización de datos de usuario ${u.email}: ROLE: ${user.role}, ${user.isActive ? 'y habilitación del usuario.' : 'e inhabilitación del usuario'}`,
        },
      });

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
        error,
      });
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prismaService.user.delete({
        where: {
          id,
        },
      });

      if (user) {
        return {
          message: `Usuario [${id}] eliminado correctamente`,
        };
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException({
          error,
          message: 'Usuario no encontrado',
        });
      }
    }
  }
}
