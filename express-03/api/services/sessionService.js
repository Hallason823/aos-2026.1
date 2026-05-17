import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import models from "../models";

const REFRESH_TOKEN_EXPIRATION_DAYS = parseInt(
  process.env.REFRESH_TOKEN_EXPIRATION_DAYS || "7",
  10
);

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "15m",
  });
};

const createRefreshToken = async (userId, expiresAt = null) => {
  const token = uuidv4();
  const expiry =
    expiresAt ||
    new Date(Date.now() + REFRESH_TOKEN_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);

  await models.RefreshToken.create({ token, userId, expiresAt: expiry });

  return { token, expiresAt: expiry };
};

const login = async (login, password) => {
  const user = await models.User.findByLogin(login);

  if (!user) {
    const err = new Error("Invalid credentials.");
    err.status = 401;
    throw err;
  }

  const valid = await user.validatePassword(password);

  if (!valid) {
    const err = new Error("Invalid credentials.");
    err.status = 401;
    throw err;
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = await createRefreshToken(user.id);

  return { accessToken, refreshToken: refreshToken.token };
};

const logout = async (refreshToken) => {
  await models.RefreshToken.destroy({ where: { token: refreshToken } });
};

const refresh = async (refreshToken) => {
  const tokenRecord = await models.RefreshToken.findOne({
    where: { token: refreshToken },
  });

  if (!tokenRecord) {
    const err = new Error("Invalid refresh token.");
    err.status = 401;
    throw err;
  }

  if (tokenRecord.expiresAt < new Date()) {
    await tokenRecord.destroy();
    const err = new Error("Refresh token expired.");
    err.status = 401;
    throw err;
  }

  const originalExpiresAt = tokenRecord.expiresAt;

  await tokenRecord.destroy();

  const accessToken = generateAccessToken(tokenRecord.userId);
  const newRefreshToken = await createRefreshToken(
    tokenRecord.userId,
    originalExpiresAt
  );

  return { accessToken, refreshToken: newRefreshToken.token };
};

export default { login, logout, refresh };
