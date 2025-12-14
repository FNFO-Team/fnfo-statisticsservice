// src/app.ts
import express from "express";
import cors from "cors";
import { json } from "express";
import { statisticsRoutes } from "./statistics/statistics.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

// Middlewares globales
app.use(cors());
app.use(json());

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "UP",
    service: "StatisticsService",
  });
});

// Rutas
app.use("/stats", statisticsRoutes);

// Manejo centralizado de errores
app.use(errorMiddleware);
