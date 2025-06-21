import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';

@Module({
  providers: [ProvidersService]
})
export class ProvidersModule {}
