import mongoose, { Schema, Document } from "mongoose";

/**
 * Estadísticas por canción
 */
export interface SongStatistics {
  songId: string;
  plays: number;
  bestScore: number;
  averageAccuracy: number;
  maxCombo: number;
}

/**
 * Documento principal de estadísticas por usuario
 */
export interface StatisticsDocument extends Document {
  userId: string;

  totalPlays: number;
  averageAccuracy: number;
  bestScore: number;
  totalPlayTimeMs: number;

  hits: {
    perfect: number;
    great: number;
    good: number;
    miss: number;
  };

  songs: SongStatistics[];

  createdAt: Date;
  updatedAt: Date;
}

const SongStatisticsSchema = new Schema<SongStatistics>(
  {
    songId: { type: String, required: true },
    plays: { type: Number, required: true, default: 0 },
    bestScore: { type: Number, required: true, default: 0 },
    averageAccuracy: { type: Number, required: true, default: 0 },
    maxCombo: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const StatisticsSchema = new Schema<StatisticsDocument>(
  {
    userId: { type: String, required: true, unique: true, index: true },

    totalPlays: { type: Number, required: true, default: 0 },
    averageAccuracy: { type: Number, required: true, default: 0 },
    bestScore: { type: Number, required: true, default: 0 },
    totalPlayTimeMs: { type: Number, required: true, default: 0 },

    hits: {
      perfect: { type: Number, default: 0 },
      great: { type: Number, default: 0 },
      good: { type: Number, default: 0 },
      miss: { type: Number, default: 0 },
    },

    songs: { type: [SongStatisticsSchema], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const StatisticsModel = mongoose.model<StatisticsDocument>(
  "Statistics",
  StatisticsSchema
);
