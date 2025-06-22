import { Controller, Get, UseGuards } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { EmployeeGuard } from 'src/guards/auth/employee.guard';

@Controller('generate')
export class GenerateController {

    constructor (private readonly genService: GenerateService) {}

    @Get('movements')
    @UseGuards(EmployeeGuard)
    generateExcel() {
        return this.genService.generateMovement();
    }

}
