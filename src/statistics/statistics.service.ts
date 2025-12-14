import { StatisticsModel, StatisticsDocument } from "./statistics.model";
import { GameResultDTO } from "../game-results/gameResult.dto";
import { mapGameResultToInternal } from "../game-results/gameResult.mapper";

export class StatisticsService {
  /**
   * Obtiene las estadísticas generales de un usuario
   * (solo lectura → usamos lean)
   */
  async getUserStatistics(
    userId: string
  ): Promise<StatisticsDocument | null> {
    return StatisticsModel.findOne({ userId }).lean();
  }

  /**
   * Obtiene estadísticas de un usuario para una canción específica
   * (solo lectura → NO tipamos como Document)
   */
  async getUserSongStatistics(
    userId: string,
    songId: string
  ): Promise<any | null> {
    const stats = await StatisticsModel.findOne(
      { userId, "songs.songId": songId },
      { "songs.$": 1 }
    ).lean();

    return stats?.songs?.[0] ?? null;
  }

  /**
   * Registra el resultado final de una partida
   * (lectura + escritura → NO usamos lean)
   */
  async registerGameResult(dto: GameResultDTO): Promise<void> {
    const result = mapGameResultToInternal(dto);

    const existingStats = await StatisticsModel.findOne({
      userId: result.userId,
    });

    // Narrowing definitivo: aquí userStats NUNCA es null
    const userStats: StatisticsDocument =
      existingStats ?? (await this.createInitialStatistics(result.userId));

    // --- Global stats ---
    userStats.totalPlays += 1;
    userStats.totalPlayTimeMs += result.durationMs;
    userStats.bestScore = Math.max(userStats.bestScore, result.score);

    userStats.averageAccuracy =
      (userStats.averageAccuracy * (userStats.totalPlays - 1) +
        result.accuracy) /
      userStats.totalPlays;

    userStats.hits.perfect += result.hits.perfect;
    userStats.hits.great += result.hits.great;
    userStats.hits.good += result.hits.good;
    userStats.hits.miss += result.hits.miss;

    // --- Song stats ---
    const songStats = userStats.songs.find(
      (s) => s.songId === result.songId
    );

    if (!songStats) {
      userStats.songs.push({
        songId: result.songId,
        plays: 1,
        bestScore: result.score,
        averageAccuracy: result.accuracy,
        maxCombo: result.maxCombo,
      });
    } else {
      songStats.plays += 1;
      songStats.bestScore = Math.max(songStats.bestScore, result.score);
      songStats.maxCombo = Math.max(songStats.maxCombo, result.maxCombo);
      songStats.averageAccuracy =
        (songStats.averageAccuracy * (songStats.plays - 1) +
          result.accuracy) /
        songStats.plays;
    }

    await userStats.save();
  }

  /**
   * Crea el documento inicial de estadísticas para un usuario
   */
  private async createInitialStatistics(
    userId: string
  ): Promise<StatisticsDocument> {
    return StatisticsModel.create({
      userId,
      totalPlays: 0,
      averageAccuracy: 0,
      bestScore: 0,
      totalPlayTimeMs: 0,
      hits: {
        perfect: 0,
        great: 0,
        good: 0,
        miss: 0,
      },
      songs: [],
    });
  }
}
