import { Controller, Get, UseGuards } from '@nestjs/common';
import { MovementService } from './movement.service';
import { AdminGuard } from 'src/guards/auth/admin.guard';

@Controller('movement')
export class MovementController {
  constructor(private readonly movService: MovementService) {}

  @Get()
  @UseGuards(AdminGuard)
  get() {
    return this.movService.get();
  }
}
