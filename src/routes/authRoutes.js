import express from "express";
import AuthController from "../controllers/authController";

const router = express.Router();

// Registro de usuário
router.post('/register', AuthController.register);

// Login do usuário
router.post('/login', AuthController.login);

export default router;
