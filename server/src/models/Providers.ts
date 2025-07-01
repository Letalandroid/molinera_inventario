import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importar ApiProperty
import { Product } from './Product';

export class ProvidersBase {
  @ApiProperty({ description: 'Id del Proveedor' })
  id: number = 0;

  @ApiProperty({ description: 'Nombre del Proveedor', required: true })
  name?: string = '';

  @ApiProperty({ description: 'Contacto del Proveedor', required: true })
  contact?: string = '';

  @ApiProperty({ description: 'Productos del Proveedor', required: false })
  Products?: Product[];
}

export class ProvidersCreate {

  @ApiProperty({ description: 'Nombre del Proveedor', required: true })
  @IsString()
  @IsNotEmpty()
  name: string = '';

  @ApiProperty({ description: 'Contacto del Proveedor', required: true })
  @IsString()
  @IsNotEmpty()
  contact: string = '';
}

export class ProvidersUpdate {
  @ApiProperty({ description: 'Nombre del Proveedor', required: true })
  @IsString()
  name?: string = '';

  @ApiProperty({ description: 'Contacto del Proveedor', required: true })
  @IsString()
  contact?: string = '';
}
