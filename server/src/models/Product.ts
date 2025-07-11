import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importar ApiProperty

export class Product {
  @ApiProperty({ description: 'Nombre del producto' })
  title: string = '';

  @ApiProperty({ description: 'Descripción del producto', required: false })
  description?: string = '';

  @ApiProperty({ description: 'Marca del producto', required: false })
  brand?: string = '';

  @ApiProperty({ description: 'Precio del producto', required: false })
  price?: number;

  @ApiProperty({
    description: 'Cantidad en stock del producto',
    required: false,
  })
  stock?: number;

  @ApiProperty({
    description: 'Fecha de creación del producto',
    required: false,
  })
  createdAt?: Date;
}

export class ProductCreate {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsNotEmpty()
  @IsString()
  title: string = '';

  @ApiProperty({ description: 'Descripción del producto', required: false })
  @IsNotEmpty()
  @IsString()
  description?: string = '';

  @ApiProperty({ description: 'Precio del producto', required: false })
  @IsNotEmpty()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'Cantidad en stock del producto',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  stock?: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Fecha de creación del producto',
    required: false,
  })
  createdAt?: Date;

  @IsNotEmpty()
  @IsNumber()
  minStock?: number;

  @IsNotEmpty()
  @IsString()
  location?: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId?: number;

  @IsNotEmpty()
  @IsNumber()
  providerId?: number;
}

export class ProductUpdate {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  title: string = '';

  @ApiProperty({ description: 'Descripción del producto', required: false })
  @IsString()
  description?: string = '';

  @ApiProperty({ description: 'Precio del producto', required: false })
  @IsNumber()
  price?: number = 0;

  @ApiProperty({
    description: 'Cantidad en stock del producto',
    required: false,
  })
  @IsNumber()
  stock?: number;

  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({
    description: 'Fecha de creación del producto',
    required: false,
  })
  createdAt?: Date;

  @IsNumber()
  minStock?: number = 10;

  @IsString()
  location?: string = 'Default Location';

  @IsNumber()
  categoryId?: number = 0;

  @IsNumber()
  providerId?: number = 0;
}

