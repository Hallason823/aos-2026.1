import jwt from "jsonwebtoken";
import models from "../models";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await models.User.findByPk(payload.userId);
    req.context.me = user || null;
    return next();
  } catch (err) {
    return res.status(401).send({ error: "Unauthorized: invalid or expired token." });
  }
};

export default authMiddleware;
