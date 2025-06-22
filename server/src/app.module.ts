import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProvidersController } from './providers/providers.controller';
import { ProvidersModule } from './providers/providers.module';
import { CategoryModule } from './category/category.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GenerateModule } from './generate/generate.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), ProductsModule, AuthModule, UsersModule, JwtModule, ProvidersModule, CategoryModule, DashboardModule, GenerateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
