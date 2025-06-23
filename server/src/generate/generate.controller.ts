import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
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
  async generateMovement(@Body() body: DateRangeDto, @Req() req) {
    const result = await this.genService.generateMovement(
      body.startDate,
      body.endDate,
      req
    );

    if ('error' in result) {
      throw new NotFoundException({
        status: 400,
        message: result.error,
      });
    }

    return result;
  }

  @Post('stocks')
  @UseGuards(EmployeeGuard)
  async generateStocks(@Req() req) {
    const result = this.genService.generateStocks(req);

    if ('error' in result) {
      throw new NotFoundException({
        status: 400,
        message: result.error,
      });
    }

    return result;
  }
}
