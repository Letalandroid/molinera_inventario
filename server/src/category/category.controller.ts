import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';

/**
 * Controlador para la gestión de categorías de productos
 * Maneja las operaciones relacionadas con las categorías utilizadas en el sistema de inventario
 */
@ApiTags('Categorías')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Obtiene todas las categorías disponibles
   */
  @Get()
  @ApiOperation({
    summary: 'Obtener todas las categorías',
    description:
      'Retorna una lista completa de todas las categorías de productos disponibles en el sistema de inventario',
  })
  @ApiOkResponse({
    description: 'Lista de categorías obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'Identificador único de la categoría',
            example: 1,
          },
          name: {
            type: 'string',
            description: 'Nombre de la categoría',
            example: 'Harinas',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor al obtener las categorías',
  })
  get() {
    return this.categoryService.get();
  }
}
