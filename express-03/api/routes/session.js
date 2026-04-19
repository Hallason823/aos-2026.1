import { Router } from "express";
import { sessionController } from "../controllers";

const router = Router();

router.get("/", sessionController.getSession);

export default router;