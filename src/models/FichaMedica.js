const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FichaMedica = sequelize.define("FichaMedica", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_sanguineo: DataTypes.STRING(10),
  alergenos: DataTypes.STRING(40),
  enfermedad_cronica: DataTypes.STRING(40),
});

module.exports = FichaMedica;