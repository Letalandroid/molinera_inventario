import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: 1,
      email: 'mirko@mirko.com',
      password: '$2b$10$C6n9oGZ87FbTsZ.cEvCuLuXicKWEKnnMgJbQsRaGqrqC/RMHuOz7S', // mirkomirko
      role: Role.ADMINISTRADOR,
      isActive: true,
    },
  });

  await prisma.profile.create({
    data: {
      user_id: 1,
      name: 'Mirko',
      dni: '12345678',
    },
  });

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
