# Etapa 1: Construir la aplicación
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Aumentamos la memoria de Node y usamos npx para compilar directamente
# Se agregó "cats-frontend" para evitar el error de ambigüedad
RUN NODE_OPTIONS="--max_old_space_size=4096" npx ng build cats-frontend --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine
# Nota: En Angular 17+, los archivos compilados suelen estar en /dist/nombre-proyecto/browser
# Si usas una versión anterior, quita "/browser" de la ruta de abajo.
COPY --from=build /app/dist/cats-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]