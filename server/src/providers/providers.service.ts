import { Injectable } from '@nestjs/common';
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
}
