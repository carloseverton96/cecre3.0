import { Router } from "express";
import controllerUser from "../controllers/controller.user.js";
import controllerNew from "../controllers/controller.new.js";
import controllerEstoque from "../controllers/controller.estoque.js";
import authMiddleware from "../../middelewares/auth.middleware.js";
import upload from "../../middelewares/upload.js";

const router = Router();

// Rotas de Usuário
router.post("/users/register", controllerUser.Inserir);
router.post("/users/login", controllerUser.Login);
router.get("/users/profile", authMiddleware, controllerUser.Profile);

// Rotas de Notícias
router.post("/news", authMiddleware, upload.single("image"), controllerNew.Inserir);
router.get("/news", controllerNew.Listar); // ✅ Pública: removido authMiddleware
router.put("/news/:id_news", authMiddleware, upload.single("image"), controllerNew.Atualizar);
// ✅ Adicionada rota para buscar notícia por ID
router.delete("/news/:id_news", authMiddleware, controllerNew.Excluir);
router.get("/news/:id_news", controllerNew.Detalhar); // ✅ Adicione esta linha


// Rotas de Estoque (todas protegidas)
router.post("/estoque", authMiddleware, controllerEstoque.Inserir);
router.get("/estoque", authMiddleware, controllerEstoque.Listar);
router.put("/estoque/:id_estoque", authMiddleware, controllerEstoque.Atualizar);
router.delete("/estoque/:id_estoque", authMiddleware, controllerEstoque.Excluir);

export default router;