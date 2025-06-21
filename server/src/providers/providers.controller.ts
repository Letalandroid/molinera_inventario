import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { AdminGuard } from 'src/guards/auth/admin.guard';

@Controller('providers')
export class ProvidersController {

    constructor (private readonly providerService: ProvidersService) {}

    @Get()
    @UseGuards(AdminGuard)
    get() {
        return this.providerService.get();
    }

}
