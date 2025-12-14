import { Request, Response } from "express";
import { StatisticsService } from "./statistics.service";
import { GameResultDTO } from "../game-results/gameResult.dto";

const statisticsService = new StatisticsService();

/**
 * GET /stats/me
 * Retorna las estadísticas generales del usuario autenticado
 */
export const getMyStatistics = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const stats = await statisticsService.getUserStatistics(userId);

  return res.status(200).json(stats);
};

/**
 * GET /stats/me/song/:songId
 * Retorna estadísticas del usuario para una canción específica
 */
export const getMySongStatistics = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { songId } = req.params;

  const stats = await statisticsService.getUserSongStatistics(userId, songId);

  return res.status(200).json(stats);
};

/**
 * POST /stats/game-result
 * Recibe el resultado final de una partida (desde GameService)
 */
export const registerGameResult = async (req: Request, res: Response) => {

  const userId = (req as any).userId;
  
  const gameResult: GameResultDTO = {
    ...req.body,
    userId, // FORZAMOS el userId del token
   };

  await statisticsService.registerGameResult(gameResult);

  return res.status(201).json({
    message: "Game result processed successfully",
  });
};
