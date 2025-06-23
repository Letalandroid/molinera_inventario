import { PrismaService } from 'src/prisma.service';

export class Audit {
  constructor(private readonly prisma: PrismaService) {}

  async getAudit(userId: number, action: string) {
    await this.prisma.auditLog.create({
      data: {
        userId,
        action,
      },
    });
  }
}
