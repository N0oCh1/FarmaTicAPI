import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Inventario extends Model {}

Inventario.init(
  {
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
  },
  {
    sequelize,
    modelName: "Inventario",
    tableName: "inventario",
    schema: "public",
  },
);
export default Inventario;
