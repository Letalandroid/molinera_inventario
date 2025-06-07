FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

COPY .env ./

RUN pnpm run build

EXPOSE 3000

CMD sh -c "sleep 5 && pnpm run prisma:migrate && pnpm start"
