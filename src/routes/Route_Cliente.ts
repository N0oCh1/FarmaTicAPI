import {CREATE, READ} from "../controllers/CRUD_Cliente.js";
import { Router } from "express";

const router = Router();

router.post("/clientes", CREATE);
router.get("/clientes/:id", READ);

export default router;