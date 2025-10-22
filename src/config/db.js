// src/config/db.js - Sesión 2: Conexión a MySQL con Sequelize
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false, //Desactivar logs SQL paara mantener consola limpia
  define: {
    timestamps: true,
    underscored: false,
  },
});

// Función para probar la conexión con diferentes configuraciones
const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Conexión a MySQL establecida correctamente')

    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync()
    console.log('📊 Base de datos sincronizada')

    // Nota: Usa los scripts seedServices.js y createSuperAdmin.js para insertar datos
    await insertSampleData()
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error.message)
    console.log('💡 Sugerencias:')
    console.log('   - Verifica que MySQL esté ejecutándose')
    console.log('   - Verifica usuario/password de MySQL')
    console.log('   - Crea la base de datos: CREATE DATABASE backend_app;')
  }
}

// Función para insertar datos de ejemplo (DESHABILITADA)
// Ahora se usan los scripts: createSuperAdmin.js y seedServices.js
const insertSampleData = async () => {
  try {
    // Importar modelos después de que sequelize esté configurado
    const { User } = require('../models')
    const { Service } = require('../models')

    // Primero verificar que exista al menos un usuario
    const userCount = await User.count()
    if (userCount === 0) {
      console.log('⚠️ No hay usuarios. Ejecuta: npm run create-superadmin')
      return
    }

    const count = await Service.count()
    if (count === 0) {
      const primerUsuario = await User.findOne()
      if (!primerUsuario) {
        console.log('⚠️ No se encontró ningún usuario. Ejecuta: npm run create-superadmin')
        return
      }
      await Service.bulkCreate([
        {
          nombre: 'Desarrollo Web',
          descripcion: 'Creación de sitios web modernos y responsivos',
          precio: 2500.00,
          usuarioId: primerUsuario.id
        },
        {
          nombre: 'Consultoría IT',
          descripcion: 'Asesoría en tecnologías de información',
          precio: 1800.00,
          usuarioId: primerUsuario.id
        },
        {
          nombre: 'Diseño UX/UI',
          descripcion: 'Diseño de experiencias de usuario excepcionales',
          precio: 2200.00,
          usuarioId: primerUsuario.id
        }
      ])
      console.log('📋 Datos de ejemplo insertados')
    }
  } catch (error) {
    console.log('⚠️ No se pudieron insertar datos de ejemplo:', error.message)
  }
}

module.exports = { sequelize, connectDB }

