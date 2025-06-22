import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AdminGuard } from 'src/guards/auth/admin.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashService: DashboardService) {}

  @Get()
  @UseGuards(AdminGuard)
  getDashboard() {
    return this.dashService.getDashboard();
  }
}
