import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DBNAME ?? "" as string,
  process.env.DBUSER ?? "" as string,
  process.env.DBPASSWORD ?? "" as string,
  {
    host: process.env.DBHOST || "",
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;