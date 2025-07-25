import { Router } from "express";
import { controllerUser, UserController } from "../controllers/controller.user.js";
import authMiddleware from "../../middelewares/auth.middleware.js";
import controllerEstoque from "./controllers/controller.estoque.js";

const router = Router();

router.post("/user/estoque", authMiddleware, controllerEstoque.InserirEstoque); //em criação

export default router;
