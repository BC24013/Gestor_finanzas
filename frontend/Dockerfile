# ─────────────────────────────────────────────
# Stage 1: Compilar la SPA con Node.js / Vite
# ─────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Copiar manifiestos primero para cachear la instalación de dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código y compilar para producción
COPY . .
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2: Servir archivos estáticos con Nginx
# ─────────────────────────────────────────────
FROM nginx:alpine

# Copiar el build generado por Vite al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx (SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
