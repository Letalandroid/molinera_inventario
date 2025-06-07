import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
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
  @IsString()
  price?: number;

  @ApiProperty({
    description: 'Cantidad en stock del producto',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  stock?: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Fecha de creación del producto',
    required: false,
  })
  createdAt?: Date;
}

export class ProductUpdate {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  id: number = 0;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  manualUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  specs?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

