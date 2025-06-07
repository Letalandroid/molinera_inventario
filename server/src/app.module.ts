import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
