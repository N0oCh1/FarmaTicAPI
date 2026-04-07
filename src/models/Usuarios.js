const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING(20),
  apellido: DataTypes.STRING(20),
  rol: DataTypes.STRING(20),
  password: DataTypes.STRING(100),
  usuario: DataTypes.STRING(20),
  ruc_doctor: DataTypes.TEXT,
  especialidades: DataTypes.STRING(20),
});

module.exports = Usuario;