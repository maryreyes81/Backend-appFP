# Guia para crear la app Backend Node.js (Sesion 4)

## 1. Crear el proyecto y estructura

```bash
mkdir backend-app
cd backend-app
npm init -y
```

## 2. Instalar dependencias

``` bash
npm install express sequelize mysql2 bcryptjs jsonwebtoken
npm install nodemon --save-dev
```


## 3. Crear estructura de carpetas y archivos
backend-app/
├── public/
|        ├── index.html
|        ├── login.html
|        ├── registro.html
|        ├── dashboard.html
|        ├── js/
|── src/
|       ── config/ ── db.js
|       ── controllers/
|                ── auth.controller.js
|                ── service.controller.js
|       ── middlewares/── auth.middlewere.js
|       ── models/
|                ── index.js
|                ── Service.js
|                ── Users.js/
├── routes/── auth.routes.js
└package.json
└gitignore
└globals

```bash
mkdir controllers models routes middlewares config public
```

## 4. Configurar la base de datos

- Ejecutar el seed de crear base de datos y  super admin y servicios:

```sql
CREATE DATABASE backend_app;
USE backend_app;

CREATE TABLE usuarios(...);
CREATE TABLE servicios(...);
```
## 5. Configurar Sequelize en `src/config/db.js`

-Define la conexion y los modelos `User` y  `Service`.

## 6. Crear los controladores y rutas
//reglas de negocio

-`src/controllers/auth.controller.js`:registro, login, perfil
-`src/controllers/service.controller.js`:CRUD de servicios
-`src/routes/auth.routes.js`:rutas de autenticacion
-`src/routes/service.routes.js`:rutas de servicios


## 7. Crear los middlewares

-`src/middlewares/auth.middleware.js`: verificacion de token y roles

## 8. Configrar el servidor en `server.js`

-Importa modelos (como va a estar los usuarios, servicios, inventario etc estructura de entidades de la base de datos) , rutas, controladores y middlewares
-Define rutas estaticas y API
-Inicia el servidor

## 9. Crear las paginas frontend en `public/`

-`index.html`: pagina principal
-`login.html`: formulario de login
-`registro.html`: formulario de registro
-`dashboard.html`: panel de usuario
-JS embebido en cada HTML para manejar formularios y peticiones



