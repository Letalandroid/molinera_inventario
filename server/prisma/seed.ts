import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Crear productos
  await prisma.product.createMany({
    data: [
      {
        title: 'Camiseta Básica',
        description: 'Camiseta de algodón 100% con un diseño minimalista.',
        price: 19.99,
        stock: 100,
      },
      {
        title: 'Polo Deportivo',
        description: 'Polo de secado rápido ideal para actividades físicas.',
        price: 24.99,
        stock: 50,
      },
      {
        title: 'Sudadera con Capucha',
        description: 'Sudadera unisex con capucha y bolsillo frontal.',
        price: 39.99,
        stock: 30,
      },
    ],
  });

  console.log('🌱 Seeds cargados correctamente con todos los productos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
