import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductCreate, ProductUpdate } from '../../src/models/Product';
import { Prisma } from '@prisma/client';
import { describe } from '../../src/utils/getPrompt';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.product.findMany();
  }

  async getOneProduct(id: number) {
    const prod_all = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    const prod_select = await this.prisma.product.findFirst({
      where: {
        id,
      },
      select: {
        title: true,
        brand: true,
        model: true,
        category: true,
        specs: true,
      },
    });

    const prod_prompt = {
      title: prod_select?.title,
      brand: prod_select?.brand,
      model: prod_select?.model,
      category: prod_select?.category,
      specs: prod_select?.specs,
    };

    const desc = await describe(prod_prompt);

    return {
      ...prod_all,
      description: desc,
    };
  }

  createProduct(p: ProductCreate) {
    const data: Prisma.ProductCreateInput = {
      title: p.title,
      description: p.description ?? undefined,
      brand: p.brand ?? '',
      price: p.price ?? 0,
      stock: p.stock ?? 0,
      createdAt: p.createdAt ?? new Date(),
      model: p.model ?? '',
      category: p.category ?? '',
      manufacturer: p.manufacturer ?? '',
      manualUrl: p.manualUrl ?? '',
      specs: p.specs ?? {},
    };

    return this.prisma.product.create({ data });
  }

  updateProduct(id: number, p: ProductUpdate) {
    const data: Prisma.ProductUpdateInput = {
      ...(p.title && { title: p.title }),
      ...(p.description && { description: p.description }),
      ...(p.brand && { brand: p.brand }),
      ...(typeof p.price === 'number' && { price: p.price }),
      ...(p.stock && { stock: p.stock }),
      ...(p.createdAt && { createdAt: p.createdAt }),
      ...(p.model && { model: p.model }),
      ...(p.category && { category: p.category }),
      ...(p.manufacturer && { manufacturer: p.manufacturer }),
      ...(p.manualUrl && { manualUrl: p.manualUrl }),
      ...(p.specs && { specs: p.specs }),
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
