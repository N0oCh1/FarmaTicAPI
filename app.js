const express = require("express");
const sequelize = require("./config/database");

require("./models");

const app = express();

app.use(express.json());

sequelize.sync({ alter: true }).then(() => {
  console.log("Base de datos sincronizada");
});

module.exports = app;