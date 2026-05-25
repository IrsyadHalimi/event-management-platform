import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "../interfaces/request.interface";

import {
  verifyToken
} from "../utils/jwt";

import { Role } from "@prisma/client";

interface JWTPayload {
  id: string;
  role: Role;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    // Lakukan casting ke interface yang sudah kita buat
    const decoded = verifyToken(token) as JWTPayload;

    // Masukkan ke req.user secara eksplisit
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};