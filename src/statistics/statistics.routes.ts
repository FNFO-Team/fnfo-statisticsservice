import { Router } from "express";
import {
  getMyStatistics,
  getMySongStatistics,
  registerGameResult,
} from "./statistics.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const statisticsRoutes = Router();

// Stats del usuario autenticado
statisticsRoutes.get("/me", authMiddleware, getMyStatistics);

// Stats del usuario para una canción
statisticsRoutes.get(
  "/me/song/:songId",
  authMiddleware,
  getMySongStatistics
);

// Registro de resultado de partida (GameService)
statisticsRoutes.post(
  "/game-result",
  authMiddleware,
  registerGameResult
);
