import express from "express";
import PostController from "../controllers/PostController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.get(
  "/publicacoes",
  authMiddleware,
  roleMiddleware(["professor"]),
  PostController.listarPost
);

routes.post(
  "/publicacoes",
  authMiddleware,
  roleMiddleware(["professor"]),
  PostController.cadastrarPost
);

routes.put(
  "/publicacoes/:id",
  authMiddleware,
  roleMiddleware(["professor"]),
  PostController.atualizarPost
);

routes.delete(
  "/publicacoes/:id",
  authMiddleware,
  roleMiddleware(["professor"]),
  PostController.excluirPost
);

export default routes;
