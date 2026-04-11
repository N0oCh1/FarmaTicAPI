import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Usuario extends Model {}

Usuario.init(
  {
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
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
    schema: "public",
  },
);
export default Usuario;
