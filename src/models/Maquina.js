const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Maquina = sequelize.define("Maquina", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ubicacion: DataTypes.STRING(50),
  activo: DataTypes.BOOLEAN,
  latitud: DataTypes.FLOAT,
  longitud: DataTypes.FLOAT,
});

module.exports = Maquina;