const PUBLIC_WRITE_ROUTES = [
  { method: "POST", path: "/session" },
  { method: "POST", path: "/session/refresh" },
  { method: "POST", path: "/session/logout" },
  { method: "POST", path: "/users" },
];

const PROTECTED_GET_ROUTES = ["/session"];

const protectRoutes = (req, res, next) => {
  const { method, path } = req;

  if (["POST", "PUT", "DELETE"].includes(method)) {
    const isPublic = PUBLIC_WRITE_ROUTES.some(
      (route) => route.method === method && route.path === path
    );

    if (!isPublic && !req.context.me) {
      return res.status(401).send({ error: "Unauthorized." });
    }
  }

  if (method === "GET" && PROTECTED_GET_ROUTES.includes(path)) {
    if (!req.context.me) {
      return res.status(401).send({ error: "Unauthorized." });
    }
  }

  return next();
};

export default protectRoutes;
