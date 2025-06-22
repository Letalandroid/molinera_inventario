import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MovementService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const movements = await this.prisma.movement.findMany({
      select: {
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
      orderBy: {
        id: 'desc',
      },
    });

    return movements.map((log) => ({
      type: log.type,
      userName: log.User?.Profile?.name || null,
      productName: log.Product.title,
      quantity: log.quantity,
      date: log.date,
    }));
  }
}
