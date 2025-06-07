import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWTConfig } from '../../src/utils/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), JwtModule.register({})],
  providers: [AuthService, PrismaService, JwtService, JWTConfig],
  controllers: [AuthController],
})
export class AuthModule {}
