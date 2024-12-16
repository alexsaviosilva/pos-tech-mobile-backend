import express from "express";
import PostController from "../controllers/PostController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const routes = express.Router();

/**
 * Middleware de depuração do Token JWT.
 * Auxilia a verificar se o token está presente no cabeçalho Authorization.
 */
const debugAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Cabeçalho Authorization recebido:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido. Faça login novamente." });
  }
  next();
};

/**
 * Rota GET - Listar todas as publicações
 * - Middleware de autenticação
 * - Middleware de verificação de perfil (professor)
 */
routes.get(
  "/publicacoes",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.listarPost
);

/**
 * Rota GET - Buscar publicação por ID
 * - Middleware de autenticação
 * - Middleware de verificação de perfil (professor)
 */
routes.get(
  "/publicacoes/:id",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.listarPostPorId
);

/**
 * Rota POST - Cadastrar nova publicação
 * - Middleware de autenticação
 * - Middleware de verificação de perfil (professor)
 */
routes.post(
  "/publicacoes",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.cadastrarPost
);

/**
 * Rota PUT - Atualizar publicação existente por ID
 * - Middleware de autenticação
 * - Middleware de verificação de perfil (professor)
 */
routes.put(
  "/publicacoes/:id",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.atualizarPost
);

/**
 * Rota DELETE - Excluir publicação por ID
 * - Middleware de autenticação
 * - Middleware de verificação de perfil (professor)
 */
routes.delete(
  "/publicacoes/:id",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.excluirPost
);

export default routes;
