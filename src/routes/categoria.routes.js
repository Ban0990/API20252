import { Router } from "express";
import {
    getCategorias,
    getCategoriaById,
    postCategoria,
    putCategoria,
    deleteCategoria
} from "../controladores/categoriaCtrl.js";

import { verifyToken } from "../jwt/verifytoken.js";

const router = Router();

// RUTAS PARA CATEGORÍAS
router.get('/categorias', verifyToken, getCategorias);
router.get('/categorias/:id', verifyToken, getCategoriaById);
router.post('/categorias', verifyToken, postCategoria);
router.put('/categorias/:id', verifyToken, putCategoria);
router.delete('/categorias/:id', verifyToken, deleteCategoria);

export default router;
