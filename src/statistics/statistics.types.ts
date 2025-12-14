/**
 * Distribución de hits de una partida / acumulado
 */
export interface HitStatistics {
  perfect: number;
  great: number;
  good: number;
  miss: number;
}

/**
 * Estadísticas agregadas por canción
 * (forma en la que se exponen al frontend)
 */
export interface SongStatistics {
  songId: string;
  plays: number;
  bestScore: number;
  averageAccuracy: number;
  maxCombo: number;
}

/**
 * Estadísticas generales de un usuario
 * (respuesta típica de GET /stats/me)
 */
export interface UserStatistics {
  userId: string;

  totalPlays: number;
  averageAccuracy: number;
  bestScore: number;
  totalPlayTimeMs: number;

  hits: HitStatistics;

  songs: SongStatistics[];

  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

/**
 * Estadísticas simplificadas de una canción
 * (GET /stats/me/song/:songId)
 */
export interface UserSongStatistics {
  songId: string;
  plays: number;
  bestScore: number;
  averageAccuracy: number;
  maxCombo: number;
}
