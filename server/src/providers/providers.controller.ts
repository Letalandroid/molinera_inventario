import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
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
import { ProvidersCreate } from 'src/models/Providers';

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

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Añadir un proveedor' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 200,
    description: 'Proveedor añadido exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Respuesta en caso de error
  async create(@Body() prov: ProvidersCreate, @Req() req) {
    return await this.providerService.create(prov, req);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Editar un proveedor' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 200,
    description: 'Proveedor editado exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Respuesta en caso de error
  async edit(@Param('id') id, @Body() prov: ProvidersCreate, @Req() req) {
    return await this.providerService.edit(parseInt(id), prov, req);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Eliminar un proveedor' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 200,
    description: 'Proveedor eliminado exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Respuesta en caso de error
  async delete(@Param('id') id, @Req() req) {
    return await this.providerService.delete(parseInt(id), req);
  }
}
