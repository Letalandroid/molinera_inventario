import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ClienteType {
  @ApiProperty({ description: 'Razón social o nombres del cliente' })
  @IsString()
  @IsNotEmpty()
  razon_social_nombres: string | undefined = '';

  @ApiProperty({ description: 'Número de documento del cliente' })
  @IsString()
  @IsNotEmpty()
  numero_documento: string | undefined = '';

  @ApiProperty({ description: 'Código del tipo de entidad del cliente' })
  @IsString()
  @IsNotEmpty()
  codigo_tipo_entidad: string = '';

  @ApiProperty({ description: 'Dirección del cliente', required: false })
  @IsString()
  @IsNotEmpty()
  cliente_direccion?: string = '';
}

export class ItemsType {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  producto: string = '';

  @ApiProperty({ description: 'Cantidad del producto' })
  @IsString()
  @IsNotEmpty()
  cantidad: string = '';

  @ApiProperty({ description: 'Precio base del producto' })
  @IsString()
  @IsNotEmpty()
  precio_base: string = '';

  @ApiProperty({ description: 'Código SUNAT del producto' })
  @IsString()
  @IsNotEmpty()
  codigo_sunat: string = '';

  @ApiProperty({ description: 'Código del producto' })
  @IsString()
  @IsNotEmpty()
  codigo_producto: string = '';

  @ApiProperty({ description: 'Código de la unidad del producto' })
  @IsString()
  @IsNotEmpty()
  codigo_unidad: string = '';

  @ApiProperty({ description: 'Código del tipo de IGV' })
  @IsString()
  @IsNotEmpty()
  tipo_igv_codigo: string = '';
}
