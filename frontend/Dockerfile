# 1. Imagen base con Node.js y pnpm activado
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 2. Instalar dependencias
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --ignore-scripts

# 3. Construir la aplicación Next.js
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Construimos la aplicación
RUN pnpm build

# 4. Imagen final de producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos los archivos necesarios desde la fase de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/frontend.config.json ./frontend.config.json
COPY --from=builder /app/run.mjs ./run.mjs

USER nextjs

# Exponemos el puerto 5000 (por defecto en tu config, aunque Next.js buscará el del config dinámicamente)
EXPOSE 5000

# Usar Node directamente sobre run.mjs evita que pnpm intente escribir en caché sin permisos
CMD ["node", "run.mjs"]
