import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importar ApiProperty
import { Role } from '@prisma/client';

export class User {
  @ApiProperty({ description: 'Id del usuario' })
  @IsNumber()
  @IsNotEmpty()
  id?: number = 0;

  @ApiProperty({
    description: 'Nombre del usuario',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string = '';

  @ApiProperty({
    description: 'DNI del usuario (8 caracteres)',
    minLength: 8,
    maxLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  dni: string = '';

  @ApiProperty({ description: 'Correo electrónico del usuario', minLength: 5 })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  email: string = '';

  @ApiProperty({ description: 'Contraseña del usuario', minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string = '';

  @ApiProperty({ description: 'Si el usuario se encuentra activo', minLength: 8 })
  @IsBoolean()
  isActive: boolean = false;

  @ApiProperty({ description: 'Rol del usuario', required: false })
  role?: Role;
}

export class UserLogin {
  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsString()
  @IsNotEmpty()
  email: string = '';

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  password: string = '';
}

export class UserChangeIsActive {
  @ApiProperty({ description: 'Id del usuario' })
  @IsNumber()
  @IsNotEmpty()
  id: number = 0;

  @ApiProperty({ description: 'Estado activo del usuario' })
  @IsNotEmpty()
  isActive: boolean = false;
}

export class UserChangeRole {
  @ApiProperty({ description: 'Id del usuario' })
  @IsNumber()
  @IsNotEmpty()
  id: number = 0;

  @ApiProperty({ description: 'Rol del usuario' })
  @IsNotEmpty()
  role: Role = Role.EMPLEADO;
}

export class UserData {

  @ApiProperty({ description: 'Rol del usuario' })
  @IsNotEmpty()
  role: Role = Role.EMPLEADO;

  @ApiProperty({ description: 'Estado activo del usuario' })
  @IsNotEmpty()
  isActive: boolean = false;
}