import {
  Request,
  Response,
  NextFunction
} from "express";

import {
  registerService,
  loginService
} from "../services/auth.service";

import {
  registerSchema,
  loginSchema
} from "../validators/auth.validator";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData =
      registerSchema.parse(
        req.body
      );

    const user =
      await registerService(
        validatedData
      );

    return res.status(201).json({
      success: true,
      message:
        "Register success",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData =
      loginSchema.parse(
        req.body
      );

    const result =
      await loginService(
        validatedData
      );

    return res.json({
      success: true,
      message:
        "Login success",
      data: result
    });
  } catch (error) {
    next(error);
  }
};