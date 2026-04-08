import express from "express";
import sequelize from "@/config/database";
import "@/models"

const app = express();

app.use(express.json());

sequelize.sync({ alter: true }).then(() => {
  console.log("Base de datos sincronizada");
});

export default app;