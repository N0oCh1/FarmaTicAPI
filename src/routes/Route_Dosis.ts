import { CREATE, READ, UPDATE, DELETE_DOSIS } from '../controllers/CRUD_Dosis.js';
import { validateDosisCreation, handleValidationErrors } from '../middleware/validateDosis.js';
import { Router } from 'express';

const router = Router();

router.post('/dosis', validateDosisCreation, handleValidationErrors, CREATE);
router.get('/dosis/:id', READ);
router.get('/dosis', READ);
router.put('/dosis/:id', validateDosisCreation, handleValidationErrors, UPDATE);
router.delete('/dosis/:id', DELETE_DOSIS);

export default router;
