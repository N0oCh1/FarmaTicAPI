import { CREATE, READ, UPDATE, DELETE_USUARIO } from '../controllers/CRUD_Usuario.js';
import { validateUsuarioCreation, handleValidationErrors } from '../middleware/validateUsuario.js';
import { Router } from 'express';

const router = Router();

router.post('/usuarios', validateUsuarioCreation, handleValidationErrors, CREATE);
router.get('/usuarios/:id', READ);
router.get('/usuarios', READ);
router.put('/usuarios/:id', validateUsuarioCreation, handleValidationErrors, UPDATE);
router.delete('/usuarios/:id', DELETE_USUARIO);

export default router;
