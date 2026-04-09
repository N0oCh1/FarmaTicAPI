import express from "express";
import RouteCliente from "./routes/Route_Cliente.js"
import "./models/index.js";

const app = express();

app.use(express.json());

// Authenticate and sync database


app.use("/api/v0/", RouteCliente);


export default app;