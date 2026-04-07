const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Dosis = sequelize.define("Dosis", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  id_medicamento: DataTypes.BIGINT,
  cantidad: DataTypes.INTEGER,
  instrucciones: DataTypes.TEXT,
});

module.exports = Dosis;