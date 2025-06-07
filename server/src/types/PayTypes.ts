import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ProductPay } from "../../src/models/Product";

export class PayData {
  @ApiProperty({ description: 'Lista de productos a pagar' })
  @IsNotEmpty()
  items: ProductPay[] = new Array<ProductPay>();

  @ApiProperty({ description: 'Correo electrónico del cliente' })
  @IsString()
  @IsNotEmpty()
  correo: string = '';
}

export class PaySuccess {
  @ApiProperty({ description: 'ID de la colección de pago' })
  @IsString()
  @IsNotEmpty()
  collection_id: string = '';

  @ApiProperty({ description: 'Estado de la colección de pago' })
  @IsString()
  @IsNotEmpty()
  collection_status: string = '';

  @ApiProperty({ description: 'ID del pago' })
  @IsString()
  @IsNotEmpty()
  payment_id: string = '';

  @ApiProperty({ description: 'Estado del pago' })
  @IsString()
  @IsNotEmpty()
  status: string = '';

  @ApiProperty({ description: 'Referencia externa del pago', required: false })
  @IsString()
  @IsNotEmpty()
  external_reference: string | null = '';

  @ApiProperty({ description: 'Tipo de pago' })
  @IsString()
  @IsNotEmpty()
  payment_type: string = '';

  @ApiProperty({ description: 'ID de la orden del comerciante' })
  @IsString()
  @IsNotEmpty()
  merchant_order_id: string = '';

  @ApiProperty({ description: 'ID de la preferencia de pago' })
  @IsString()
  @IsNotEmpty()
  preference_id: string = '';

  @ApiProperty({ description: 'ID del sitio de pago' })
  @IsString()
  @IsNotEmpty()
  site_id: string = '';

  @ApiProperty({ description: 'Modo de procesamiento del pago' })
  @IsString()
  @IsNotEmpty()
  processing_mode: string = '';

  @ApiProperty({ description: 'ID de la cuenta del comerciante', required: false })
  @IsString()
  @IsNotEmpty()
  merchant_account_id: string | null = '';
}

