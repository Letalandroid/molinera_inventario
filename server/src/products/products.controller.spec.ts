import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

describe('ProductsController', () => {
  let controller: ProductsController;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService, JwtService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products and validate their structure', async () => {
    const result = await controller.getAllProducts();

    // Verifica que sea un array y tenga al menos un producto
    expect(Array.isArray(result)).toBe(true);

    for (const product of result) {
      expect(product).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          stock: expect.any(Object),
          createdAt: expect.any(Date),
          brand: expect.any(String),
          category: expect.any(String),
          model: expect.any(String),
          specs: expect.any(Object),
        }),
      );

      expect(
        product.description === null || typeof product.description === 'string'
      ).toBe(true);

      expect(
        product.price === null || typeof product.price === 'number'
      ).toBe(true);

      expect(
        product.manualUrl === null || typeof product.manualUrl === 'string'
      ).toBe(true);

      expect(
        product.manufacturer === null || typeof product.manufacturer === 'string'
      ).toBe(true);

    }
  });
});
