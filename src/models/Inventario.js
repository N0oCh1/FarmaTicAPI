const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inventario = sequelize.define("Inventario", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_medicamento: DataTypes.STRING(40),
  marca: DataTypes.STRING(40),
  precio: DataTypes.DECIMAL,
  cantidad: DataTypes.INTEGER,
  resetado: DataTypes.BOOLEAN,
});

module.exports = Inventario;