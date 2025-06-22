import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { EmployeeGuard } from 'src/guards/auth/employee.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashService: DashboardService) {}

  @Get()
  @UseGuards(EmployeeGuard)
  getDashboard() {
    return this.dashService.getDashboard();
  }
}
