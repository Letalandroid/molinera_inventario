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

  // Seed Categories
  const categories = [
    { name: 'Ropa Casual' },
    { name: 'Deportivo' },
    { name: 'Accesorios' }
  ];
  const categoryRecords = await Promise.all(
    categories.map(cat =>
      prisma.category.create({ data: cat })
    )
  );

  // Seed Providers
  const providers = [
    { name: 'Textiles SA', contact: 'contacto@textilessa.com' },
    { name: 'Deportes Pro', contact: 'ventas@deportespro.com' }
  ];
  const providerRecords = await Promise.all(
    providers.map(pv =>
      prisma.provider.create({ data: pv })
    )
  );

  // Seed Products
  await prisma.product.createMany({
    data: [
      {
        title: 'Camiseta Básica',
        description: 'Algodón 100% con diseño minimalista.',
        price: 19.99,
        stock: 100,
        minStock: 20,
        location: 'Estante A1',
        isActive: true,
        categoryId: categoryRecords.find(c => c.name === 'Ropa Casual')!.id,
        providerId: providerRecords[0].id
      },
      {
        title: 'Polo Deportivo',
        description: 'Secado rápido, ideal para entrenamiento.',
        price: 24.99,
        stock: 50,
        minStock: 10,
        location: 'Estante B3',
        isActive: true,
        categoryId: categoryRecords.find(c => c.name === 'Deportivo')!.id,
        providerId: providerRecords[1].id
      },
      {
        title: 'Sudadera con Capucha',
        description: 'Unisex, capucha y bolsillo frontal.',
        price: 39.99,
        stock: 30,
        minStock: 5,
        location: 'Estante C2',
        isActive: true,
        categoryId: categoryRecords.find(c => c.name === 'Ropa Casual')!.id,
        providerId: providerRecords[0].id
      },
      {
        title: 'Gorra "Sport"',
        description: 'Ajustable, transpirable.',
        price: 12.5,
        stock: 200,
        minStock: 30,
        location: 'Estante D4',
        isActive: true,
        categoryId: categoryRecords.find(c => c.name === 'Accesorios')!.id,
        providerId: providerRecords[1].id
      }
    ]
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
