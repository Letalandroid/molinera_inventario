import {
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  const mockExecutionContext = (authHeader?: string): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: authHeader,
          },
        }),
      }),
    }) as unknown as ExecutionContext;

  beforeEach(() => {
    jwtService = {
      verify: jest.fn(),
    } as unknown as JwtService;

    guard = new AuthGuard(jwtService);
  });

  it('should throw UnauthorizedException if no token is provided', () => {
    const context = mockExecutionContext(undefined);
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token format is invalid', () => {
    const context = mockExecutionContext('InvalidTokenFormat');
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw ForbiddenException if role is missing or incorrect', () => {
    jwtService.verify = jest.fn().mockReturnValue({ role: 'CLIENTE' });

    const context = mockExecutionContext('Bearer valid.token');
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should allow access if token is valid and role is GERENTE', () => {
    jwtService.verify = jest.fn().mockReturnValue({ role: 'GERENTE' });

    const context = mockExecutionContext('Bearer valid.token');
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if token verification fails', () => {
    jwtService.verify = jest.fn(() => {
      throw new Error('invalid token');
    });

    const context = mockExecutionContext('Bearer invalid.token');
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should call jwt.verify with the correct token', () => {
    jwtService.verify = jest.fn().mockReturnValue({ role: 'GERENTE' });

    const context = mockExecutionContext('Bearer valid.token');
    guard.canActivate(context);

    expect(jwtService.verify).toHaveBeenCalledWith('valid.token');
  });
});
