import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { ProvidersService } from './providers.service';
import { AdminGuard } from 'src/guards/auth/admin.guard';

/**
 * Controlador para la gestión de proveedores
 * Maneja las operaciones relacionadas con los proveedores de productos
 *
 * @requires AdminGuard - Solo usuarios con rol de administrador pueden acceder a estos endpoints
 */
@ApiTags('Proveedores')
@ApiBearerAuth('JWT-auth')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providerService: ProvidersService) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Obtener todos los proveedores',
    description:
      'Retorna una lista completa de todos los proveedores registrados en el sistema. Requiere permisos de administrador.',
  })
  @ApiOkResponse({
    description: 'Lista de proveedores obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'Identificador único del proveedor',
            example: 1,
          },
          name: {
            type: 'string',
            description: 'Nombre comercial del proveedor',
            example: 'Agricultores Unidos SAC',
          },
          contact: {
            type: 'string',
            description:
              'Información de contacto del proveedor (email, teléfono, etc.)',
            example: 'ventas@agricultoresunidos.com',
            nullable: true,
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token de autenticación inválido o ausente',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Token inválido o expirado',
        },
        statusCode: {
          type: 'number',
          example: 401,
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Acceso denegado - Se requieren permisos de administrador',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Acceso denegado. Se requieren permisos de administrador',
        },
        statusCode: {
          type: 'number',
          example: 403,
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor al obtener los proveedores',
  })
  get() {
    return this.providerService.get();
  }
}
