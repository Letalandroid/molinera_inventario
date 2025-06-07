import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLogin, User } from '../models/User';
import { genHash } from '../utils/bcrypt';

@ApiTags('Auth') // Categoría para agrupar los endpoints relacionados con autenticación
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' }) // Descripción breve del endpoint
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' }) // Respuesta esperada
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para el registro.',
  }) // Respuesta en caso de error
  async register(@Body() user: User) {
    user.password = await genHash(user.password);
    return this.authService.register(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión con un usuario existente' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' }) // Respuesta esperada
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' }) // Respuesta en caso de error
  login(@Body() user: UserLogin) {
    return this.authService.login(user);
  }
}
