import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};