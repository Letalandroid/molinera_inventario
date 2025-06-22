import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const auditLogs = await this.prisma.auditLog.findMany({
      select: {
        id: true,
        User: { select: { Profile: { select: { name: true } } } },
        action: true,
        timestamp: true,
      },
      orderBy: { id: 'asc' },
    });

    return auditLogs.map((log) => ({
      id: log.id,
      userName: log.User?.Profile?.name || null,
      action: log.action,
      timestamp: log.timestamp,
    }));
  }
}
