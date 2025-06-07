import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token no proporcionado o formato inválido.',
      );
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = this.jwt.verify(token);

      if (!payload.role || payload.role !== 'GERENTE') {
        throw new ForbiddenException('No tienes permisos suficientes.');
      }

      return true;
    } catch (err) {
      if (err instanceof ForbiddenException) {
        throw err;
      }

      throw new UnauthorizedException({
        message: 'Token inválido o expirado.',
        error: err,
      });
    }
  }
}
