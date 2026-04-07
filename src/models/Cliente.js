const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cliente = sequelize.define("Cliente", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(20),
  },
  cedula: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
  },
  correo: {
    type: DataTypes.STRING(50),
  },
  asegurado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  sexo: {
    type: DataTypes.STRING(10),
  },
});

module.exports = Cliente;