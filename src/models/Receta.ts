import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Receta extends Model {}

Receta.init(
  {
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
  },
  {
    sequelize,
    modelName: "Receta",
    tableName: "recetas",
    schema: "public",
  },
);
export default Receta;
