import { Request, Response, NextFunction } from "express";
import { firebaseAdmin } from "../config/firebase";

/**
 * Middleware de autenticación basado en Firebase ID Token.
 * - Verifica el token
 * - Extrae el uid
 * - Inyecta req.userId
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    // Inyectamos el userId para uso posterior
    (req as any).userId = decodedToken.uid;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
