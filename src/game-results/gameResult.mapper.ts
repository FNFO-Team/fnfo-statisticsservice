import { GameResultDTO } from "./gameResult.dto";

/**
 * Estructura normalizada que el StatisticsService usa internamente
 */
export interface NormalizedGameResult {
  userId: string;
  songId: string;
  score: number;
  accuracy: number;
  maxCombo: number;
  durationMs: number;
  playedAt: Date;
  hits: {
    perfect: number;
    great: number;
    good: number;
    miss: number;
  };
}

/**
 * Mapper de GameResultDTO a estructura interna normalizada
 */
export const mapGameResultToInternal = (
  dto: GameResultDTO
): NormalizedGameResult => {
  return {
    userId: dto.userId,
    songId: dto.songId,
    score: dto.score,
    accuracy: dto.accuracy,
    maxCombo: dto.maxCombo,
    durationMs: dto.durationMs,
    playedAt: new Date(dto.playedAt),
    hits: {
      perfect: dto.hits.perfect,
      great: dto.hits.great,
      good: dto.hits.good,
      miss: dto.hits.miss,
    },
  };
};
