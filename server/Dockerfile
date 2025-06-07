FROM node:18-alpine

WORKDIR /app

# Instalar pnpm global y deps
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install

# Copiar todo el código fuente
COPY . .

# Copiar .env (importante para prisma y app)
COPY .env ./

# Ejecutar migraciones y semillas si quieres (opcional, mejor hacerlo en startup o CI/CD)
RUN pnpm run prisma:migrate
RUN pnpm run prisma:seed

# Construir proyecto si es necesario (por ej. con tsc)
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
