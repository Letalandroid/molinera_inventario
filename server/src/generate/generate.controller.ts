import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GenerateService } from './generate.service';
import { EmployeeGuard } from 'src/guards/auth/employee.guard';
import { DateRangeDto } from 'src/models/DateRange';

@Controller('reports')
export class GenerateController {
  constructor(private readonly genService: GenerateService) {}

  @Post('movements')
  @UseGuards(EmployeeGuard)
  async generateExcel(@Body() body: DateRangeDto) {
    const result = await this.genService.generateMovement(
      body.startDate,
      body.endDate,
    );

    if ('error' in result) {
      throw new NotFoundException({
        status: 400,
        message: result.error,
      });
    }

    return result;
  }
}
