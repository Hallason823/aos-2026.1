import { Router } from "express";
import { personController } from "../controllers";

const router = Router();

router.get("/", personController.getPersons);
router.get("/:personId", personController.getPerson);
router.post("/", personController.createPerson);
router.put("/:personId", personController.updatePerson);
router.delete("/:personId", personController.deletePerson);

export default router;
