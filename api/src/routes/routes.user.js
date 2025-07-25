import { Router } from "express";
import controllerUser from "../controllers/controller.user.js";
import authMiddleware from "../../middelewares/auth.middleware.js";


const router = Router();

router.post("/users/register", controllerUser.Inserir);
router.post("/users/login", controllerUser.Login);

// router.get("/users/profile", authMiddleware, controllerUser.Profile);
// router.get("/users", authMiddleware, controllerUser.Listar);
// router.get("/users/:id_user", authMiddleware, controllerUser.ListarPorId);  // Rota para obter dados do usuário específico
// router.put("/users/:id_user", authMiddleware, controllerUser.Editar);
// router.delete("/users/:id_user", authMiddleware, controllerUser.Excluir);

export default router;
