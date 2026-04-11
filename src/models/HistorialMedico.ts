import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class HistorialMedico extends Model {}

HistorialMedico.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_consulta: DataTypes.DATE,
    motivo_consulta: DataTypes.STRING(255),
    diagnostico: DataTypes.STRING(500),
    tratamiento: DataTypes.STRING(500),
    observaciones: DataTypes.STRING(500),
    presion_arterial: DataTypes.STRING(20),
    temperatura: DataTypes.DECIMAL,
    peso: DataTypes.DECIMAL,
    altura: DataTypes.DECIMAL,
    frecuencia_cardiaca: DataTypes.INTEGER,
    medico: DataTypes.STRING(150),
    fecha_registro: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "HistorialMedico",
    tableName: "historiales_medicos",
    schema: "public",
  },
);
export default HistorialMedico;
