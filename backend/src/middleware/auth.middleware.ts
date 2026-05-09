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

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized"
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      verifyToken(token);

    req.user = decoded as any;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid token"
    });
  }
};