import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/database";

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
  },
);
export default Inventario;
