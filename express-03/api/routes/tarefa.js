import { Router } from "express";
import { tarefaController } from "../controllers";

const router = Router();

router.get("/", tarefaController.getTarefas);
router.get("/:objectId", tarefaController.getTarefa);
router.post("/", tarefaController.createTarefa);
router.put("/:objectId", tarefaController.updateTarefa);
router.delete("/:objectId", tarefaController.deleteTarefa);

export default router;