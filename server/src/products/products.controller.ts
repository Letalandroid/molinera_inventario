import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductCreate, ProductUpdate } from '../../src/models/Product';
import { EmployeeGuard } from '../guards/auth/employee.guard';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DateRangeDto } from 'src/models/DateRange';

@ApiTags('Products') // Categoría para agrupar los endpoints relacionados con productos
@Controller('products')
export class ProductsController {
  constructor(private readonly prodService: ProductsService) {}

  /**
   * EndPoint de /getAll para enlistar todos los productos
   * @returns toda la lista de productos
   */
  @Get()
  @UseGuards(EmployeeGuard)
  @ApiOperation({ summary: 'Obtener todos los productos' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Respuesta en caso de error
  getAllProducts() {
    return this.prodService.getProducts();
  }

  @Get('/:id')
  @UseGuards(EmployeeGuard)
  @ApiOperation({ summary: 'Obtener un producto individual' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Respuesta en caso de error
  async getOneProducts(@Param('id') id: string) {
    const producto = await this.prodService.getOneProduct(parseInt(id));

    if (!producto) {
      throw new NotFoundException({
        status: 400,
        message: `No existe el producto ID: [${id}]`,
      });
    }
    return this.prodService.getOneProduct(parseInt(id));
  }

  @Post('/filter')
  @UseGuards(EmployeeGuard)
  @ApiOperation({ summary: 'Filtrar un producto' }) // Descripción breve del endpoint
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido exitosamente.',
  }) // Respuesta esperada
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' }) // Respuesta en caso de error
  async filterProduct(@Body() body: DateRangeDto) {
    return await this.prodService.filterProduct(body.startDate, body.endDate);
  }

  /**
   * Endpoint para crear los productos
   * @param p Producto nuevo a agregar
   * @returns Un mensaje de satisfaccion
   */
  @Post('create')
  @UseGuards(EmployeeGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
  })
  @ApiOperation({ summary: 'Crear un nuevo producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Crea un nuevo producto' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Error al crear el producto.' }) // Respuesta en caso de error
  async createProduct(@Body() p: ProductCreate, @Req() req) {
    try {
      return await this.prodService.createProduct(p, req);
    } catch (error) {
      throw new NotFoundException({
        status: 400,
        message: `Error al crear el producto: ${error}`,
      });
    }
  }

  /**
   * Actualiza el producto a introducir en la base de datos
   * @param p Producto a actualizar
   * @returns Mensaje satisfactorio/error
   */
  @Put(':id')
  @UseGuards(EmployeeGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Actualiza el producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Actualiza un producto' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Error al actualizar el producto.' }) // Respuesta en caso de error
  async updateProduct(@Param('id') id: string, @Body() p: ProductUpdate, @Req() req) {
    try {
      return await this.prodService.updateProduct(parseInt(id), p, req);
    } catch (error) {
      throw new NotFoundException({
        status: 400,
        message: `Error al actualizar el producto: ${error}`,
        p,
      });
    }
  }

  /**
   * Elimina un producto en la base de datos
   * @param id Identificador del producto
   * @returns Un mensaje de satisfaccion por parte de prisma o de error
   */
  @Delete('delete/:id')
  @UseGuards(EmployeeGuard)
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT en formato Bearer',
    required: true,
  })
  @ApiOperation({ summary: 'Elimina el producto' }) // Descripción breve del endpoint
  @ApiResponse({ status: 200, description: 'Elimina un producto' }) // Respuesta esperada
  @ApiResponse({ status: 400, description: 'Error al eliminar el producto.' }) // Respuesta en caso de error
  async deleteProduct(@Param('id') id: string, @Req() req) {
    try {
      await this.prodService.deleteProduct(parseInt(id), req);

      return {
        res: 'ok',
        message: `Producto ${id} eliminado correctamente`,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException({
          status: 400,
          message: `El producto con ID: [${id}] no existe o ya ha sido eliminado.`,
          error: error.message,
        });
      }

      throw new NotFoundException({
        status: 400,
        message: `Error al eliminar el producto: ${error}`,
        error,
      });
    }
  }
}
