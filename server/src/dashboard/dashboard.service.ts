import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    const countProviders = await this.prisma.provider.count();
    const countProducts = await this.prisma.product.count();
    const countUsers = await this.prisma.user.count();

    return [
      {
        icon: 'fas fa-truck',
        name: 'Proveedores',
        count: countProviders,
        color: '#fe860b',
      },
      {
        icon: 'fas fa-box',
        name: 'Productos',
        count: countProducts,
        color: '#6f52be',
      },
      {
        icon: 'fas fa-users',
        name: 'Usuarios',
        count: countUsers,
        color: '#e93260',
      },
    ];
  }
}
