import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Crear usuario administrador
  await prisma.user.create({
    data: {
      id: 1,
      email: 'admin@molinera.com',
      password: '$2b$10$C6n9oGZ87FbTsZ.cEvCuLuXicKWEKnnMgJbQsRaGqrqC/RMHuOz7S', // mirkomirko
      role: Role.ADMINISTRADOR,
      isActive: true,
    },
  });

  // Crear perfil del administrador
  await prisma.profile.create({
    data: {
      user_id: 1,
      name: 'Administrador Molinera',
      dni: '12345678',
    },
  });

  // Crear usuario empleado
  await prisma.user.create({
    data: {
      id: 2,
      email: 'operador@molinera.com',
      password: '$2b$10$C6n9oGZ87FbTsZ.cEvCuLuXicKWEKnnMgJbQsRaGqrqC/RMHuOz7S',
      role: Role.EMPLEADO,
      isActive: true,
    },
  });

  await prisma.profile.create({
    data: {
      user_id: 2,
      name: 'Operador de Molino',
      dni: '87654321',
    },
  });

  // Seed Categories - Categorías típicas de una molinera
  const categories = [
    { name: 'Harinas' },
    { name: 'Granos y Cereales' },
    { name: 'Subproductos' },
    { name: 'Insumos de Molienda' },
    { name: 'Empaques y Envases' },
  ];
  const categoryRecords = await Promise.all(
    categories.map((cat) => prisma.category.create({ data: cat })),
  );

  // Seed Providers - Proveedores típicos de una molinera
  const providers = [
    {
      name: 'Agricultores Unidos SAC',
      contact: 'ventas@agricultoresunidos.com',
    },
    {
      name: 'Granos del Norte EIRL',
      contact: 'contacto@granosdelnorte.pe',
    },
    {
      name: 'Distribuidora de Cereales Lima',
      contact: 'pedidos@cereallima.com',
    },
    {
      name: 'Empaques Industriales SA',
      contact: 'info@empaquesindustriales.pe',
    },
    {
      name: 'Maquinaria Molinera Técnica',
      contact: 'repuestos@molineratecnica.com',
    },
  ];
  const providerRecords = await Promise.all(
    providers.map((pv) => prisma.provider.create({ data: pv })),
  );

  // Seed Products - Productos típicos de una molinera
  await prisma.product.createMany({
    data: [
      // HARINAS
      {
        title: 'Harina de Trigo Especial',
        description:
          'Harina refinada de trigo, ideal para panadería y repostería. Contenido de proteína 11-12%.',
        price: 45.5,
        stock: 500,
        minStock: 100,
        location: 'Almacén A - Sección 1',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Harinas')!.id,
        providerId: providerRecords[0].id,
      },
      {
        title: 'Harina de Maíz Amarillo',
        description:
          'Harina fina de maíz amarillo, libre de gluten. Para preparación de tamales y otros.',
        price: 38.9,
        stock: 300,
        minStock: 75,
        location: 'Almacén A - Sección 2',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Harinas')!.id,
        providerId: providerRecords[1].id,
      },
      {
        title: 'Harina Integral de Trigo',
        description:
          'Harina integral con alto contenido de fibra, ideal para panes integrales.',
        price: 42.8,
        stock: 200,
        minStock: 50,
        location: 'Almacén A - Sección 3',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Harinas')!.id,
        providerId: providerRecords[0].id,
      },
      {
        title: 'Harina de Quinua',
        description:
          'Harina de quinua orgánica, rica en proteínas y aminoácidos esenciales.',
        price: 85.0,
        stock: 80,
        minStock: 20,
        location: 'Almacén A - Sección 4',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Harinas')!.id,
        providerId: providerRecords[2].id,
      },

      // GRANOS Y CEREALES
      {
        title: 'Trigo Nacional Premium',
        description:
          'Trigo de alta calidad para molienda. Humedad máxima 14%. Saco de 50kg.',
        price: 95.0,
        stock: 1000,
        minStock: 200,
        location: 'Silo B - Compartimento 1',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Granos y Cereales')!
          .id,
        providerId: providerRecords[0].id,
      },
      {
        title: 'Maíz Amarillo Duro',
        description:
          'Maíz amarillo duro para molienda y elaboración de alimentos balanceados.',
        price: 72.5,
        stock: 800,
        minStock: 150,
        location: 'Silo B - Compartimento 2',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Granos y Cereales')!
          .id,
        providerId: providerRecords[1].id,
      },
      {
        title: 'Quinua Blanca Lavada',
        description:
          'Quinua blanca premium, lavada y seleccionada. Lista para procesamiento.',
        price: 165.0,
        stock: 150,
        minStock: 30,
        location: 'Almacén C - Estante 1',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Granos y Cereales')!
          .id,
        providerId: providerRecords[2].id,
      },
      {
        title: 'Cebada Pelada',
        description:
          'Cebada pelada de primera calidad, ideal para harinas especiales.',
        price: 68.0,
        stock: 300,
        minStock: 60,
        location: 'Almacén C - Estante 2',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Granos y Cereales')!
          .id,
        providerId: providerRecords[1].id,
      },

      // SUBPRODUCTOS
      {
        title: 'Salvado de Trigo',
        description:
          'Subproducto de la molienda de trigo, rico en fibra. Para alimento balanceado.',
        price: 25.5,
        stock: 400,
        minStock: 80,
        location: 'Almacén D - Zona A',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Subproductos')!.id,
        providerId: providerRecords[0].id,
      },
      {
        title: 'Afrecho de Trigo',
        description:
          'Afrecho fino de trigo, subproducto de alta calidad para alimentación animal.',
        price: 22.8,
        stock: 350,
        minStock: 70,
        location: 'Almacén D - Zona B',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Subproductos')!.id,
        providerId: providerRecords[0].id,
      },
      {
        title: 'Polvillo de Arroz',
        description:
          'Subproducto del pulido de arroz, rico en vitaminas del complejo B.',
        price: 18.9,
        stock: 250,
        minStock: 50,
        location: 'Almacén D - Zona C',
        isActive: true,
        categoryId: categoryRecords.find((c) => c.name === 'Subproductos')!.id,
        providerId: providerRecords[1].id,
      },

      // INSUMOS DE MOLIENDA
      {
        title: 'Piedras de Molino Francesas',
        description:
          'Juego de piedras para molino de cereales. Diámetro 80cm, grano medio.',
        price: 2850.0,
        stock: 2,
        minStock: 1,
        location: 'Almacén E - Repuestos',
        isActive: true,
        categoryId: categoryRecords.find(
          (c) => c.name === 'Insumos de Molienda',
        )!.id,
        providerId: providerRecords[4].id,
      },
      {
        title: 'Cernidores Malla 60',
        description:
          'Cernidor de acero inoxidable, malla 60 mesh para clasificación de harinas.',
        price: 350.0,
        stock: 8,
        minStock: 2,
        location: 'Almacén E - Repuestos',
        isActive: true,
        categoryId: categoryRecords.find(
          (c) => c.name === 'Insumos de Molienda',
        )!.id,
        providerId: providerRecords[4].id,
      },
      {
        title: 'Rodillos para Molino',
        description:
          'Rodillos estriados para molino de cilindros. Acero endurecido.',
        price: 1200.0,
        stock: 4,
        minStock: 2,
        location: 'Almacén E - Repuestos',
        isActive: true,
        categoryId: categoryRecords.find(
          (c) => c.name === 'Insumos de Molienda',
        )!.id,
        providerId: providerRecords[4].id,
      },

      // EMPAQUES Y ENVASES
      {
        title: 'Sacos de Polipropileno 50kg',
        description:
          'Sacos de polipropileno para envasado de harinas y granos. Resistentes y reutilizables.',
        price: 2.5,
        stock: 2000,
        minStock: 500,
        location: 'Almacén F - Empaques',
        isActive: true,
        categoryId: categoryRecords.find(
          (c) => c.name === 'Empaques y Envases',
        )!.id,
        providerId: providerRecords[3].id,
      },
      {
        title: 'Bolsas de Papel Kraft 1kg',
        description:
          'Bolsas de papel kraft para venta al por menor de harinas especiales.',
        price: 0.25,
        stock: 5000,
        minStock: 1000,
        location: 'Almacén F - Empaques',
        isActive: true,
        categoryId: categoryRecords.find(
          (c) => c.name === 'Empaques y Envases',
        )!.id,
        providerId: providerRecords[3].id,
      },
      {
        title: 'Etiquetas Adhesivas',
        description:
          'Etiquetas adhesivas para identificación de productos. Resistentes a la humedad.',
        price: 0.05,
        stock: 10000,
        minStock: 2000,
        location: 'Almacén F - Empaques',
        isActive: true,
        categoryId: categoryRecords.find(
          (c) => c.name === 'Empaques y Envases',
        )!.id,
        providerId: providerRecords[3].id,
      },
    ],
  });

  // Crear algunos movimientos iniciales
  const productos = await prisma.product.findMany();

  await prisma.movement.createMany({
    data: [
      // Ingresos iniciales
      {
        type: 'INGRESO',
        quantity: 500,
        productId: productos.find(
          (p) => p.title === 'Harina de Trigo Especial',
        )!.id,
        userId: 1,
        date: new Date('2024-01-15'),
      },
      {
        type: 'INGRESO',
        quantity: 1000,
        productId: productos.find((p) => p.title === 'Trigo Nacional Premium')!
          .id,
        userId: 1,
        date: new Date('2024-01-15'),
      },
      {
        type: 'INGRESO',
        quantity: 2000,
        productId: productos.find(
          (p) => p.title === 'Sacos de Polipropileno 50kg',
        )!.id,
        userId: 2,
        date: new Date('2024-01-16'),
      },
      // Algunas salidas
      {
        type: 'SALIDA',
        quantity: 50,
        productId: productos.find((p) => p.title === 'Harina de Quinua')!.id,
        userId: 2,
        date: new Date('2024-01-18'),
      },
      {
        type: 'SALIDA',
        quantity: 100,
        productId: productos.find(
          (p) => p.title === 'Harina de Trigo Especial',
        )!.id,
        userId: 2,
        date: new Date('2024-01-20'),
      },
    ],
  });

  // Crear algunos logs de auditoría
  await prisma.auditLog.createMany({
    data: [
      {
        userId: 1,
        action: 'Sistema inicializado con productos base de molinera',
        timestamp: new Date('2024-01-15T08:00:00Z'),
      },
      {
        userId: 1,
        action: 'Carga masiva de inventario inicial completada',
        timestamp: new Date('2024-01-15T09:30:00Z'),
      },
      {
        userId: 2,
        action: 'Registro de ingreso de sacos de polipropileno',
        timestamp: new Date('2024-01-16T10:15:00Z'),
      },
      {
        userId: 2,
        action: 'Venta de harina de quinua - 50kg',
        timestamp: new Date('2024-01-18T14:30:00Z'),
      },
    ],
  });

  console.log('🌾 Seeds de molinera cargados correctamente!');
  console.log(
    '📦 Productos creados: harinas, granos, subproductos, insumos y empaques',
  );
  console.log(
    '🏭 Proveedores: agricultores, distribuidores y fabricantes de maquinaria',
  );
  console.log('👥 Usuarios: administrador y operador de molino');
  console.log('📊 Movimientos iniciales y logs de auditoría registrados');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
