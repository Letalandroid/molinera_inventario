import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  get() {
    return this.prisma.category.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }
}
