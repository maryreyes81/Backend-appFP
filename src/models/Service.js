// src/models/Service.js - Sesión 4: Modelo de Servicio con Usuario
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require('./Users');

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "services",
    timestamps: true,
     createdAt: "created_at", 
     updatedAt: "updated_at" 
  }
);


module.exports = Service;
