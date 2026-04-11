import { CREATE, READ, UPDATE, DELETE_RECETA } from '../controllers/CRUD_Receta.js';
import { validateRecetaCreation, handleValidationErrors } from '../middleware/validateReceta.js';
import { Router } from 'express';

const router = Router();

router.post('/recetas', validateRecetaCreation, handleValidationErrors, CREATE);
router.get('/recetas/:id', READ);
router.get('/recetas', READ);
router.put('/recetas/:id', validateRecetaCreation, handleValidationErrors, UPDATE);
router.delete('/recetas/:id', DELETE_RECETA);

export default router;
