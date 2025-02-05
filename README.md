# AdoptMe - Backend 3

Este proyecto consiste en el desarrollo del backend para la aplicación de adopción de mascotas **"AdoptMe"**. Fue desarrollado como parte del curso **"Programación Backend III: Testing y Escalabilidad Backend"** de **CODERHOUSE**, en la comisión **70150**. La aplicación original ha sido ampliada para incorporar:

- Pruebas y documentación de las rutas API.
- Dockerización de la aplicación.

## Imagen DockerHub

Puedes acceder a la imagen Docker desde el siguiente enlace: [AdoptMe en DockerHub](https://hub.docker.com/r/judithbraver/judithbraver).

## Descripción del Proyecto

Este proyecto facilita la creación de datos ficticios para las colecciones de **usuarios** y **mascotas**, empleando la biblioteca **Faker**. Los datos generados se cargan masivamente en la base de datos de pruebas, lo que permite realizar **tests** con datos simulados y evita el uso de información real en el entorno de desarrollo.

---

## Requisitos Previos

Antes de comenzar con la instalación, asegúrate de tener instalados los siguientes programas:

- **Node.js** y **npm**.
- **MongoDB** (URI configurada en un archivo `.env` para la conexión a la base de datos). Ver archivo `env.example`.

---

## ¿Cómo instalar?

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/BraverJudith/adoptme---entrega-back-III.git

2. **Instalar las dependencias**
   npm install

3. **Ejecutar el proyecto:**
   npm run dev

---

## Características del Proyecto

- **Endpoints de la API**: Permiten la creación y almacenamiento de datos de prueba, así como el registro de adopciones de mascotas.
- **Pruebas y documentación**: Incluye pruebas unitarias y de integración para validar los endpoints y garantizar el correcto funcionamiento del sistema.
- **Dockerización**: La aplicación está dockerizada, permitiendo su ejecución en contenedores Docker.

---

## Pruebas Incluidas

El proyecto incluye pruebas para verificar la funcionalidad de los endpoints de adopciones y usuarios. Las pruebas están ubicadas en los archivos correspondientes y cubren lo siguiente:

### Endpoints de Adopciones (`router/adoption.router.js`):
- **`GET /api/adoptions`**: Devuelve todas las adopciones registradas.
- **`GET /api/adoptions/{aid}`**: Devuelve una adopción específica, identificada por su ID.
- **`POST /api/adoptions/{uid}/{pid}`**: Crea una nueva adopción asociando un usuario y una mascota.

### Endpoints de Usuarios (`router/users.router.js`):
- **`GET /api/users`**: Devuelve todos los usuarios registrados.
- **`POST /api/users`**: Crea un nuevo usuario con la información proporcionada.
- **`GET /api/users/{uid}`**: Devuelve un usuario específico por su ID.
- **`PUT /api/users/{uid}`**: Actualiza los datos de un usuario específico identificado por su ID.
- **`DELETE /api/users/{uid}`**: Elimina un usuario específico identificado por su ID.
---

## Documentación de APIs

Este proyecto incluye una documentación interactiva para la API utilizando **Swagger**. Esto permite explorar y probar los diferentes endpoints directamente desde un navegador.

### Acceso a la Documentación

La documentación interactiva de Swagger está disponible en la siguiente URL (reemplazar con el puerto configurado en las variables de entorno):

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

