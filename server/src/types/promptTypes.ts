import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { JsonValue } from "node_modules/@prisma/client/runtime/library";

export class ProductPromptType {
  @ApiProperty({ description: 'Título del producto' })
  @IsString()
  @IsNotEmpty()
  title?: string | null | undefined = '';

  @ApiProperty({ description: 'Marca del producto' })
  @IsString()
  @IsNotEmpty()
  brand?: string | null | undefined = '';

  @ApiProperty({ description: 'Modelo del producto' })
  @IsString()
  @IsNotEmpty()
  model?: string | null | undefined = '';

  @ApiProperty({ description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty()
  category?: string | null | undefined = '';

  @ApiProperty({ description: 'Especificaciones del producto en formato clave-valor' })
  @IsObject()
  @IsNotEmpty()
  specs?: JsonValue | null = {};
}
