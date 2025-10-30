//tests/setup.js - Configuracion global para los tests
const { sequelize, connectTestDB } = require('../src/config/db.test')

//Configurar base de datos de test
beforeAll(async () => {
    //Usar SQLite en memoria para tests
    process.env.NODE_ENV = 'test'

    try {
        await connectTestDB()
        console.log('Base de datos de test configurada(SQL en memoria)');
} catch (error) {
    console.error('Error al configurar la base de datos de test:', error);
  }
});

afterAll(async () => {
  await sequelize.close(); // Cierra la conexión después de los tests
});

