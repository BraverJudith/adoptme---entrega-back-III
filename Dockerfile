# Usa una imagen base de Node.js
FROM node:lts

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias, incluyendo la reconstrucción de bcrypt si es necesario
RUN npm install

# Si es necesario, compilar bcrypt desde el origen (asegura la compatibilidad)
RUN npm rebuild bcrypt --build-from-source

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto que la aplicación está utilizando
EXPOSE 3000

# Ejecuta la aplicación
CMD ["npm", "start"]
