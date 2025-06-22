import { Controller, Get } from '@nestjs/common';
import { AuditLogService } from './audit_log.service';

@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditService: AuditLogService) {}

  @Get()
  get() {
    return this.auditService.get();
  }
}
