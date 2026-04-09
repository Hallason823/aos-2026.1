import { Router } from "express";

const router = Router();
router.get("/", async (req, res) => {
  if (!req.context.me) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  const user = await req.context.models.User.findByPk(req.context.me.id);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  return res.status(200).send(user);
});

export default router;
