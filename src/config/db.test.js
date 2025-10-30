const { Sequelize } = require("sequelize");

// Crear instancia de Sequelize con SQLite en memoria
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", // Base de datos en memoria
  logging: false,      // Sin logs durante tests
  define: {
    timestamps: true,
    underscored: false
  }
});

// Función para conectar y sincronizar en tests
const connectTestDB = async () => {
  try {
    await sequelize.authenticate(); // ✅ sin punto antes de sequelize
    await sequelize.sync({ force: true }); // Recrear tablas en cada test
    return sequelize;
  } catch (error) {
    console.error("Error conectando a base de datos de test:", error);
    throw error;
  }
};

module.exports = { sequelize, connectTestDB }; 
