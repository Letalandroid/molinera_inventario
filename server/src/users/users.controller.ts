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
  Req,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AdminGuard } from '../guards/auth/admin.guard';
import {
  UserChangeIsActive,
  UserChangeRole,
  UserData,
} from '../../src/models/User';
import { EmployeeGuard } from 'src/guards/auth/employee.guard';
import { PrismaClientKnownRequestError } from 'node_modules/@prisma/client/runtime/library';

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
  @UseGuards(EmployeeGuard)
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
  async getProfileById(@Param('id') id: string, @Req() req) {
    try {
      return this.userService.getProfileById(parseInt(id), req);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new UnauthorizedException({
        message: 'You do not have permission to access this resource',
      });
    }
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiTags('Users')
  @ApiOperation({ summary: 'Cambiar la data de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Data del usuario actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para acceder a este recurso.',
  })
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  updateData(@Param('id') id: string, @Body() user: UserData, @Req() req) {
    return this.userService.updateData(parseInt(id), user, req);
  }

  @Put(':id/isActive')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiTags('Users')
  @ApiOperation({ summary: 'Cambiar el estado activo de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Estado activo del usuario actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para acceder a este recurso.',
  })
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  changeIsActive(@Param('id') id: string, @Body() user: UserChangeIsActive) {
    return this.userService.changeIsActive(parseInt(id), user);
  }

  @Put(':id/role')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiTags('Users')
  @ApiOperation({ summary: 'Cambiar el rol de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Rol del usuario actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para acceder a este recurso.',
  })
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  changeRole(@Param('id') id: string, @Body() user: UserChangeRole) {
    return this.userService.changeRole(parseInt(id), user);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiTags('Users')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para acceder a este recurso.',
  })
  @ApiResponse({ status: 401, description: 'Token no válido o no encontrado.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  deleteUser(@Param('id') id: string) {
    try {
      return this.userService.deleteUser(parseInt(id));
    } catch (error) {
      throw new NotFoundException({
        error,
        message: 'Usuario no encontrado',
      });
    }
  }
}
