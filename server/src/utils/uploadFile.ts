import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'fs';
import * as path from 'path';

export interface uploadFile {
  publicUrl: string;
}

export const upload = async (
  filePath: string,
  filename: string,
): Promise<uploadFile> => {
  const supabase = createClient(
    `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co`,
    process.env.SUPABASE_SERVICE_ROL_KEY || '', // asegúrate de usar la correcta
    {
      db: { schema: 'public' },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    },
  );

  // ✅ Leer el archivo directamente desde el sistema de archivos
  const buffer = await fs.readFile(filePath);

  // 📤 Subirlo al bucket 'movements'
  const { error: uploadError } = await supabase.storage
    .from('movements')
    .upload(filename, buffer, {
      contentType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // 🔗 Obtener URL pública del archivo
  const { data: publicUrlData } = supabase.storage
    .from('movements') // Asegúrate de que es el bucket correcto
    .getPublicUrl(filename);

  if (!publicUrlData?.publicUrl) {
    throw new Error('Failed to get public URL');
  }

  return { publicUrl: publicUrlData.publicUrl };
};
