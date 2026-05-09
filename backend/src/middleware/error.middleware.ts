import {
  Request,
  Response,
  NextFunction
} from "express";

import { ZodError } from "zod";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message:
        "Validation error",
      errors: error.errors
    });
  }

  return res.status(500).json({
    success: false,
    message:
      error.message ||
      "Internal server error"
  });
};