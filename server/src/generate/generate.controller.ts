import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { EmployeeGuard } from 'src/guards/auth/employee.guard';
import { DateRangeDto } from 'src/models/DateRange';

@Controller('reports')
export class GenerateController {

    constructor (private readonly genService: GenerateService) {}

    @Get('movements')
    @UseGuards(EmployeeGuard)
    async generateExcel(@Body() body: DateRangeDto) {
        return this.genService.generateMovement(body.startDate, body.endDate);
    }

}
