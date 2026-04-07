const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Receta = sequelize.define("Receta", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  doctor_remitente: DataTypes.STRING(20),
  ruc_doctor_remitente: DataTypes.STRING(50),
  hospital_remitente: DataTypes.STRING(20),
  telefono_hospital: DataTypes.STRING(20),
  correo: DataTypes.STRING(50),
  codigo: DataTypes.INTEGER,
  fecha: DataTypes.DATE,
});

module.exports = Receta;