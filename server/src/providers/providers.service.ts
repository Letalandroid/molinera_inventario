import {
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProvidersCreate, ProvidersUpdate } from 'src/models/Providers';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProvidersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  get() {
    return this.prisma.provider.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async create(prov: ProvidersCreate, @Req() req) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Token no proporcionado o formato inválido.',
        );
      }

      const token = authHeader.replace('Bearer ', '');

      const { userId } = this.jwt.decode(token);

      const provider = await this.prisma.provider.create({
        data: prov,
      });

      await this.prisma.auditLog.create({
        data: {
          userId,
          action: `Creación de proveedor: ${JSON.stringify(provider)}`,
        },
      });

      return provider;
    } catch (error) {
      throw new NotFoundException({
        error,
        message: 'Error al crear el proveedor.',
      });
    }
  }

  async edit(id: number, prov: ProvidersUpdate, @Req() req) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Token no proporcionado o formato inválido.',
        );
      }

      const token = authHeader.replace('Bearer ', '');

      const { userId } = this.jwt.decode(token);

      const provider = await this.prisma.provider.update({
        where: {
          id,
        },
        data: prov,
      });

      await this.prisma.auditLog.create({
        data: {
          userId,
          action: `Actualización de proveedor: ${JSON.stringify(provider)}`,
        },
      });

      return provider;
    } catch (error) {
      throw new NotFoundException({
        error,
        message: `Error al editar el proveedor [${id}].`,
      });
    }
  }

  async delete(id: number, @Req() req) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Token no proporcionado o formato inválido.',
        );
      }

      const token = authHeader.replace('Bearer ', '');

      const { userId } = this.jwt.decode(token);

      const provider = await this.prisma.provider.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          contact: true,
        },
      });

      await this.prisma.provider.delete({
        where: {
          id,
        },
      });

      await this.prisma.auditLog.create({
        data: {
          userId,
          action: `Eliminación de proveedor: ${JSON.stringify(provider)}`,
        },
      });

      return {
        message: `Eliminación de proveedor [${id}] realizada exitosamente.`,
      };
    } catch (error) {
      throw new NotFoundException({
        error,
        message: `Error al eliminar el proveedor [${id}].`,
      });
    }
  }
}
