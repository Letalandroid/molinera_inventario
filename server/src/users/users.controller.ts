import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
  ForbiddenException,
  UseGuards,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AdminGuard } from '../guards/auth/admin.guard';
import { UserChangeIsActive, UserChangeRole } from 'src/models/User';

@ApiTags('Users') // Categoría para agrupar los endpoints relacionados con usuarios
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('getAll')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Descripción breve del endpoint
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' }) // Respuesta en caso de token inválido
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para acceder a este recurso.',
  }) // Respuesta en caso de falta de permisos
  async getAllUsers(@Headers('Authorization') headers: string) {
    try {
      return this.userService.getAllUsers();
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new UnauthorizedException({
        message: 'You do not have permission to access this resource',
      });
    }
  }

  @Get('/profile/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener el perfil del usuario' }) // Descripción breve del endpoint
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Obtener el perfil del usuario exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' }) // Respuesta en caso de token inválido
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para acceder a este recurso.',
  }) // Respuesta en caso de falta de permisos
  async getProfileById(@Param('id') id: string) {
    try {
      return this.userService.getProfileById(parseInt(id));
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new UnauthorizedException({
        message: 'You do not have permission to access this resource',
      });
    }
  }

  @Put('isActive')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiTags('Users')
  @ApiOperation({ summary: 'Cambiar el estado activo de un usuario' })
  @ApiResponse({ status: 200, description: 'Estado activo del usuario actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para acceder a este recurso.' })
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  changeIsActive(@Body() user: UserChangeIsActive) {
      return this.userService.changeIsActive(user);
  }

  @Put('role')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiTags('Users')
  @ApiOperation({ summary: 'Cambiar el rol de un usuario' })
  @ApiResponse({ status: 200, description: 'Rol del usuario actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 403, description: 'No tienes permiso para acceder a este recurso.' })
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  changeRole(@Body() user: UserChangeRole) {
      return this.userService.changeRole(user);
  }
}
