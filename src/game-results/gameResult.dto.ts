/**
 * DTO que representa el resultado FINAL de una partida
 * enviado desde GameService al StatisticsService.
 */
export interface GameResultDTO {
  userId: string;        // Firebase UID
  songId: string;        // Identificador de la canción
  score: number;         // Score total de la partida
  accuracy: number;      // Accuracy final (0 - 100)
  maxCombo: number;      // Combo máximo alcanzado
  durationMs: number;    // Duración de la partida en milisegundos
  playedAt: string;      // ISO date string

  hits: {
    perfect: number;
    great: number;
    good: number;
    miss: number;
  };
}
