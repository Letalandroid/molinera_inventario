import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma.service';
import { upload, uploadFile } from 'src/utils/uploadFile';

@Injectable()
export class GenerateService {
  constructor(private readonly prisma: PrismaService) {}

  async generateMovement(
    startDate: string,
    endDate: string,
  ): Promise<uploadFile> {
    const data = await this.prisma.movement.findMany({
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      select: {
        type: true,
        User: {
          select: {
            Profile: {
              select: {
                name: true,
              },
            },
          },
        },
        Product: {
          select: {
            title: true,
          },
        },
        quantity: true,
        date: true,
      },
    });

    if (!data || data.length === 0) {
      return {
        error: 'No hay movimientos en el rango indicado.',
        publicUrl: '',
      };
    }

    try {
      // Transform nested data to flat structure for Excel
      const flattenedData = data.map((movement) => ({
        Tipo: movement.type,
        Usuario: movement.User?.Profile?.name || 'N/A',
        Producto: movement.Product?.title || 'N/A',
        Cantidad: movement.quantity,
        Fecha: movement.date
          ? new Date(movement.date).toLocaleDateString('es-ES')
          : 'N/A',
      }));

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Convert JSON to worksheet
      const worksheet = XLSX.utils.json_to_sheet(flattenedData);

      // Set column widths for better readability
      worksheet['!cols'] = [
        { width: 15 }, // Tipo
        { width: 25 }, // Usuario
        { width: 30 }, // Producto
        { width: 12 }, // Cantidad
        { width: 15 }, // Fecha
      ];

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Movimientos');

      // Generate buffer
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      // Define file path
      const fileName = `Movimientos_${Date.now()}.xlsx`;
      const filePath = path.join(process.cwd(), 'temp', fileName);

      // Ensure directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Save file
      await fs.writeFile(filePath, buffer);

      const fileUpload = await upload(filePath, fileName, 'movements');

      // ✅ Eliminar el archivo local después de subirlo
      await fs.unlink(filePath);

      // console.log(`Excel file uploaded to Supabase: ${fileUpload.publicUrl}`);
      return fileUpload;
    } catch (error) {
      console.error('Error generating Excel file:', error);
      throw new Error('Failed to generate Excel file');
    }
  }

  async generateStocks(): Promise<uploadFile> {
    const data = await this.prisma.product.findMany({
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
        title: true,
        stock: true,
      },
    });

    if (!data || data.length === 0) {
      return {
        error: 'No hay productos.',
        publicUrl: '',
      };
    }

    try {
      // 1. Transformar la data
      const flattenedData = data.map((product) => ({
        ID: product.id,
        Titulo: product.title,
        Stock: product.stock,
        Observacion:
          product.stock <= 10 ? '¡Stock bajo!' : 'No tiene observaciones',
      }));

      // 2. Crear el resumen
      const productosConStockBajo = data
        .filter((p) => p.stock <= 10)

      const resumenTexto = `Cantidad de productos con stock bajo: ${productosConStockBajo.length}`;

      // 3. Crear un worksheet vacío
      const worksheet = XLSX.utils.aoa_to_sheet([]);

      // 4. Agregar resumen manual en A1
      worksheet['A1'] = { t: 's', v: resumenTexto };
      worksheet['A2'] = { t: 's', v: '' };

      // 5. Agregar los datos desde A3
      XLSX.utils.sheet_add_json(worksheet, flattenedData, {
        origin: 'A3',
      });

      // 6. Definir el rango manualmente (si deseas)
      const totalRows = flattenedData.length + 2;
      worksheet['!ref'] = `A1:D${totalRows}`;

      // 7. Definir anchos de columna
      worksheet['!cols'] = [
        { width: 10 }, // ID
        { width: 40 }, // Titulo
        { width: 10 }, // Stock
        { width: 25 }, // Observacion
      ];

      // 8. Crear y guardar el workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock productos');

      // Generate buffer
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      // Define file path
      const fileName = `Stocks_${Date.now()}.xlsx`;
      const filePath = path.join(process.cwd(), 'temp', fileName);

      // Ensure directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Save file
      await fs.writeFile(filePath, buffer);

      const fileUpload = await upload(filePath, fileName, 'stocks');

      // ✅ Eliminar el archivo local después de subirlo
      await fs.unlink(filePath);

      // console.log(`Excel file uploaded to Supabase: ${fileUpload.publicUrl}`);
      return fileUpload;
    } catch (error) {
      console.error('Error generating Excel file:', error);
      throw new Error('Failed to generate Excel file');
    }
  }
}
