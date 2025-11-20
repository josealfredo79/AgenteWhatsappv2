### Multi-stage Dockerfile para Railway - fuerza Node.js 20
### Construye la app Next.js en /frontend y ejecuta el servidor custom (server.js)

## Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app/frontend

# Instala herramientas necesarias para compilar dependencias nativas si las hay
RUN apk add --no-cache python3 make g++

# Copiar package.json y lock si existe, luego el resto del frontend
COPY frontend/package.json frontend/package-lock.json* ./
COPY frontend/ ./

# Instala dependencias (usa package-lock si está presente)
RUN if [ -f package-lock.json ]; then npm ci --prefer-offline --no-audit; else npm install --prefer-offline --no-audit; fi

# Build de Next.js
RUN npm run build

## Stage 2: Producción
FROM node:20-alpine
WORKDIR /app

# Copiar artefactos desde el builder
COPY --from=builder /app/frontend ./frontend

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Ejecuta el servidor custom que inicia Next.js y Socket.io
CMD ["node", "frontend/server.js"]
