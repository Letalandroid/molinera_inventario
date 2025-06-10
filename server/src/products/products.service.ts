import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductCreate, ProductUpdate } from '../../src/models/Product';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany({
      orderBy: {
        id: 'asc',
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

  createProduct(p: ProductCreate) {
    const data: Prisma.ProductCreateInput = {
      title: p.title,
      description: p.description,
      stock: p.stock || 0,
      createdAt: p.createdAt,
      isActive: p.isActive,
      price: p.price,
      minStock: p.minStock || 10,
      location: p.location || '',
    };

    return this.prisma.product.create({ data });
  }

  updateProduct(id: number, p: ProductUpdate) {
    const data: Prisma.ProductUpdateInput = {
      ...(p.title && { title: p.title }),
      ...(p.description && { description: p.description }),
      ...(typeof p.price === 'number' && { price: p.price }),
      ...(p.stock && { stock: p.stock }),
      ...(p.createdAt && { createdAt: p.createdAt }),
      ...(typeof p.isActive === 'boolean' && { isActive: p.isActive }),
    };

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
