import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), ProductsModule, AuthModule, UsersModule, JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
