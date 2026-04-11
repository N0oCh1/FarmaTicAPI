import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.js";

class Dosis extends Model {}

Dosis.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    id_medicamento: DataTypes.BIGINT,
    cantidad: DataTypes.INTEGER,
    instrucciones: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Dosis",
    tableName: "dosis",
    schema: "public",
  },
);
export default Dosis;