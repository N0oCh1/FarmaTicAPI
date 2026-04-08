import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/database";

class Cliente extends Model {}

Cliente.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(20),
    },
    cedula: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
    },
    correo: {
      type: DataTypes.STRING(50),
    },
    asegurado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sexo: {
      type: DataTypes.STRING(10),
    },
  },
  {
    sequelize,
    modelName: "Cliente",
  },
);

export default Cliente;