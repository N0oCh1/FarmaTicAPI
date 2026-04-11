import {CREATE, READ, UPDATE} from "../controllers/CRUD_Cliente.js";
import { validateClienteCreation, handleValidationErrors } from "../middleware/validateCliente.js";
import { Router } from "express";

const router = Router();

router.post("/clientes", validateClienteCreation, handleValidationErrors, CREATE);
router.put("/clientes/:id", handleValidationErrors, UPDATE);
router.get("/clientes/:id", READ);

export default router;