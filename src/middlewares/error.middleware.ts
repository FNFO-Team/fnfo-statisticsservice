import { Request, Response, NextFunction } from "express";

/**
 * Middleware global de manejo de errores
 */
export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Unhandled error:", err);

  return res.status(500).json({
    message: "Internal server error",
  });
};
