import express from "express";
import PostController from "../controllers/postController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const routes = express.Router();


const debugAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Cabeçalho Authorization recebido:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido. Faça login novamente." });
  }
  next();
};



routes.get(
  "/publicacoes",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.listarPost
);

routes.get(
  "/publicacoes/:id",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.listarPostPorId
);

routes.post(
  "/publicacoes",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.cadastrarPost
);

routes.put(
  "/publicacoes/:id",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.atualizarPost
);

routes.delete(
  "/publicacoes/:id",
  authMiddleware,
  roleMiddleware(["professor"]),
  debugAuthMiddleware,
  PostController.excluirPost
);

export default routes;
