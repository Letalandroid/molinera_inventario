import { Injectable, NotFoundException } from '@nestjs/common';
import { ProvidersCreate, ProvidersUpdate } from 'src/models/Providers';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  get() {
    return this.prisma.provider.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async create(prov: ProvidersCreate) {
    try {
      return await this.prisma.provider.create({
        data: prov,
      });
    } catch (error) {
      throw new NotFoundException({
        error,
        message: 'Error al crear el proveedor.',
      });
    }
  }

  async edit(id: number, prov: ProvidersUpdate) {
    try {
      const provider = await this.prisma.provider.update({
        where: {
          id,
        },
        data: prov,
      });

      if (provider) {
        return {
          message: `Proveedor [${id}] editado correctamente.`
        }
      }
    } catch (error) {
      throw new NotFoundException({
        error,
        message: `Error al editar el proveedor [${id}].`,
      });
    }
  }

  async delete(id: number) {
    try {
      const provider = await this.prisma.provider.delete({
        where: {
          id,
        },
      });

      if (provider) {
        return {
          message: `Proveedor [${id}] eliminado correctamente.`
        }
      }
    } catch (error) {
      throw new NotFoundException({
        error,
        message: `Error al eliminar el proveedor [${id}].`,
      });
    }
  }
}
