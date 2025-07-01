import {
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductCreate, ProductUpdate } from '../../src/models/Product';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  getProducts() {
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Provider: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getOneProduct(id: number) {
    const prod_all = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    return prod_all;
  }

  async filterProduct(startDate: string, endDate: string) {
    const data = await this.prisma.movement.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        type: true,
        User: {
          select: {
            Profile: {
              select: {
                name: true,
              },
            },
          },
        },
        Product: {
          select: {
            title: true,
          },
        },
        quantity: true,
        date: true,
      },
    });

    const flattenedData = data.map((movement) => ({
      id: movement.id,
      type: movement.type,
      userName: movement.User?.Profile?.name || 'N/A',
      productName: movement.Product?.title || 'N/A',
      quantity: movement.quantity,
      date: movement.date
        ? new Date(movement.date).toLocaleDateString('es-ES')
        : 'N/A',
    }));

    return flattenedData;
  }

  async createProduct(p: ProductCreate, @Req() req) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token no proporcionado o formato inválido.',
      );
    }

    const token = authHeader.replace('Bearer ', '');

    const { userId } = this.jwt.decode(token);

    const data: Prisma.ProductCreateInput = {
      title: p.title,
      description: p.description,
      stock: p.stock ?? 0,
      createdAt: p.createdAt ?? new Date(),
      isActive: p.isActive ?? true,
      price: p.price,
      minStock: p.minStock ?? 10,
      location: p.location,
      Category: p.categoryId ? { connect: { id: p.categoryId } } : undefined,
      Provider: p.providerId ? { connect: { id: p.providerId } } : undefined,
    };

    const producto = await this.prisma.product.create({ data });

    await this.prisma.movement.create({
      data: {
        type: 'INGRESO',
        quantity: producto.stock,
        userId,
        productId: producto.id,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: `Creación de producto: ${JSON.stringify(p)}`,
      },
    });

    return producto;
  }

  async updateProduct(id: number, p: ProductUpdate, @Req() req) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token no proporcionado o formato inválido.',
      );
    }

    const token = authHeader.replace('Bearer ', '');

    const { userId } = this.jwt.decode(token);

    const beforeProduct = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    const data: Prisma.ProductUpdateInput = {
      ...(p.title && { title: p.title }),
      ...(p.description && { description: p.description }),
      ...(typeof p.price === 'number' && { price: p.price }),
      ...(p.stock && { stock: p.stock }),
      ...(p.createdAt && { createdAt: p.createdAt }),
      ...(typeof p.isActive === 'boolean' && { isActive: p.isActive }),
      ...(typeof p.categoryId === 'number' && { categoryId: p.categoryId }),
      ...(typeof p.providerId === 'number' && { providerId: p.providerId }),
    };

    const product = await this.prisma.product.update({
      where: { id },
      data,
    });

    if (p.stock && beforeProduct && beforeProduct.stock < p.stock) {
      await this.prisma.movement.create({
        data: {
          type: 'INGRESO',
          quantity: p.stock - beforeProduct.stock,
          userId,
          productId: id,
        },
      });
    } else if (p.stock && beforeProduct && beforeProduct.stock > p.stock) {
      await this.prisma.movement.create({
        data: {
          type: 'SALIDA',
          quantity: beforeProduct.stock - p.stock,
          userId,
          productId: id,
        },
      });
    }

    await this.prisma.auditLog.create({
      data: {
        userId,
        action: `Actualización de productos: ${JSON.stringify(p)}`,
      },
    });

    return product;
  }

  async deleteProduct(id: number, @Req() req) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Token no proporcionado o formato inválido.',
        );
      }

      const token = authHeader.replace('Bearer ', '');

      const { userId } = this.jwt.decode(token);

      const product = await this.prisma.product.delete({
        where: { id },
      });

      if (!product || !product.id) {
        throw new NotFoundException('Producto no válido');
      }

      // await this.prisma.movement.create({
      //   data: {
      //     type: 'SALIDA',
      //     quantity: product?.stock,
      //     userId,
      //     productId: product?.id,
      //   },
      // });

      await this.prisma.auditLog.create({
        data: {
          userId,
          action: `Eliminación de producto: ${JSON.stringify(product)}`,
        },
      });

      return product;
    } catch (error) {
      throw new NotFoundException({
        status: 400,
        message: `Error al eliminar el producto: ${error}`,
      });
    }
  }
}
