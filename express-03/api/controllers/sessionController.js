import { sessionService } from "../services";

const getSession = async (req, res) => {
  return res.status(200).send(req.context.me);
};

const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).send({ error: "login and password are required." });
    }

    const tokens = await sessionService.login(login, password);
    return res.status(200).send(tokens);
  } catch (err) {
    if (err.status === 401) {
      return res.status(401).send({ error: err.message });
    }
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send({ error: "refreshToken is required." });
    }

    await sessionService.logout(refreshToken);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send({ error: "refreshToken is required." });
    }

    const tokens = await sessionService.refresh(refreshToken);
    return res.status(200).send(tokens);
  } catch (err) {
    if (err.status === 401) {
      return res.status(401).send({ error: err.message });
    }
    next(err);
  }
};

export default { getSession, login, logout, refresh };
