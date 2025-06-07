import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [JWTConfig],
  exports: [JwtModule],
})
export class JWTConfig {
  constructor(private readonly configService: ConfigService) {}

  getConfig() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN') || '60s',
    };
  }
}
