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

  @ApiProperty({ description: 'Marca del producto', required: false })
  @IsNotEmpty()
  @IsString()
  brand?: string = '';

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

  @ApiProperty({
    description: 'Fecha de creación del producto',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({ description: 'Marca del producto', required: false })
  @IsNotEmpty()
  @IsString()
  model?: string = '';

  @ApiProperty({ description: 'Marca del producto', required: false })
  @IsNotEmpty()
  @IsString()
  category?: string = '';

  @ApiProperty({ description: 'Marca del producto', required: false })
  @IsString()
  manufacturer?: string = '';

  @ApiProperty({ description: 'Marca del producto', required: false })
  @IsString()
  manualUrl?: string = '';

  @IsObject()
  @IsNotEmpty()
  specs: Record<string, any> = {};
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

export class ProductPay {
  @ApiProperty({ description: 'ID del producto' })
  @IsNotEmpty()
  id: string = '';

  @ApiProperty({ description: 'Título del producto', minLength: 5 })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string = '';

  @ApiProperty({ description: 'Cantidad del producto' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number = 0;

  @ApiProperty({ description: 'Precio unitario del producto' })
  @IsNotEmpty()
  @IsNumber()
  unit_price: number = 0;
}
