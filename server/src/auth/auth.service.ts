import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserLogin } from '../models/User';
import { PrismaService } from '../prisma.service';
import { comparePassword } from '../utils/bcrypt';
import { JWTConfig } from '../utils/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly jwtConfig: JWTConfig,
  ) {}

  async register(data: User) {
    try {
      const user = {
        email: data.email,
        password: data.password,
        role: data.role,
        isActive: data.isActive ?? false,
      };

      const { id } = await this.prisma.user.create({ data: user });

      const profile = {
        user_id: id,
        dni: data.dni,
        name: data.name,
      };

      await this.prisma.profile.create({ data: profile });

      return {
        status: 201,
        message: 'Usuario registrado exitosamente',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Error por duplicado de email (código P2002)
        if (error.code === 'P2002') {
          throw new BadRequestException({
            message: 'Este correo electrónico ya está registrado',
            suggestion:
              'Por favor, utiliza un correo diferente o inicia sesión si ya tienes una cuenta',
          });
        }
        // Error por restricción de clave foránea (código P2003)
        else if (error.code === 'P2003') {
          throw new BadRequestException({
            message: 'Error en los datos del registro',
            suggestion:
              'Verifica que todos los campos obligatorios estén completos',
          });
        }
        // Otros errores conocidos de Prisma
        else {
          throw new BadRequestException({
            message: 'No se pudo completar el registro',
            suggestion:
              'Verifica que todos los datos sean correctos e intenta nuevamente',
          });
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException({
          message: 'Los datos proporcionados no son válidos',
          suggestion:
            'Revisa que todos los campos requeridos estén llenos y tengan el formato correcto',
        });
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new BadRequestException({
          message: 'Ocurrió un problema inesperado durante el registro',
          suggestion: 'Por favor, intenta nuevamente en unos momentos',
        });
      } else {
        // Otros tipos de errores no relacionados con Prisma
        throw new BadRequestException({
          message: 'No se pudo procesar tu solicitud de registro',
          suggestion: 'Verifica tu conexión a internet e intenta nuevamente',
        });
      }
    }
  }

  async login(user: UserLogin) {
    try {
      const foundUser = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!foundUser) {
        throw new UnauthorizedException({
          message: 'Credenciales incorrectas',
          suggestion:
            'Verifica tu correo electrónico y contraseña, o regístrate si no tienes una cuenta',
        });
      }

      const isPasswordValid = await comparePassword(
        user.password,
        foundUser.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException({
          message: 'Credenciales incorrectas',
          suggestion: 'Verifica tu correo electrónico y contraseña',
        });
      }

      if (!foundUser.isActive) {
        throw new UnauthorizedException({
          message: 'Tu cuenta está desactivada',
          suggestion: 'Contacta al administrador para activar tu cuenta',
        });
      }

      const profile = await this.prisma.profile.findUnique({
        where: {
          user_id: foundUser.id,
        },
      });

      const payload = {
        userId: foundUser.id,
        username: profile?.name || foundUser.email,
        role: foundUser.role,
        email: foundUser.email,
      };

      return {
        token: await this.jwtService.signAsync(
          payload,
          this.jwtConfig.getConfig(),
        ),
        user: {
          id: foundUser.id,
          name: profile?.name || foundUser.email,
          email: foundUser.email,
          role: foundUser.role,
        },
        message: '¡Bienvenido! Has iniciado sesión correctamente',
      };
    } catch (error) {
      // Si ya es una excepción que lanzamos nosotros, la re-lanzamos
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      // Para errores inesperados durante el login
      throw new UnauthorizedException({
        message: 'No se pudo procesar tu solicitud de inicio de sesión',
        suggestion: 'Verifica tu conexión a internet e intenta nuevamente',
      });
    }
  }

  // Método adicional para validar si un email ya existe (útil para el frontend)
  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true }, // Solo necesitamos saber si existe
    });
    return !!user;
  }

  // Método para obtener información del perfil del usuario autenticado
  async getProfile(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          Profile: true,
        },
      });

      if (!user) {
        throw new NotFoundException({
          message: 'No se encontró tu perfil de usuario',
          suggestion: 'Intenta cerrar sesión y volver a iniciar sesión',
        });
      }

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        profile: user.Profile
          ? {
              dni: user.Profile.dni,
              name: user.Profile.name,
            }
          : null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new NotFoundException({
        message: 'No se pudo obtener la información de tu perfil',
        suggestion: 'Intenta nuevamente en unos momentos',
      });
    }
  }
}
