import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Maquina extends Model {}

Maquina.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    ubicacion: DataTypes.STRING(50),
    activo: DataTypes.BOOLEAN,
    latitud: DataTypes.FLOAT,
    longitud: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "Maquina",
  },
);
export default Maquina;
