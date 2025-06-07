import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
      ConfigModule.forRoot(),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          expiresIn: configService.get('JWT_EXPIRES_IN') || '60s'
        }),
      }),
    ],
  providers: [ProductsService, PrismaService],
  controllers: [ProductsController],
})
export class ProductsModule {}
