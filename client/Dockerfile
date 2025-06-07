# Etapa 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json y lockfile para instalar deps
COPY package.json pnpm-lock.yaml* ./

# Instalar pnpm global y deps
RUN npm install -g pnpm
RUN pnpm install

# Copiar todo el código fuente
COPY . .

# Construir la app para producción
RUN pnpm run build

# Etapa 2: Servir la app estática con nginx
FROM nginx:alpine

# Copiar los archivos build de la etapa anterior al directorio nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar configuración nginx si quieres (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
