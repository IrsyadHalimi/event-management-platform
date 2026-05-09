import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "../interfaces/request.interface";

import {
  updateProfileSchema,
  resetPasswordSchema
} from "../validators/profile.validator";

import {
  updateProfileService,
  uploadProfilePictureService,
  forgotPasswordService,
  resetPasswordService
} from "../services/user.service";

export const updateProfile =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedData =
        updateProfileSchema.parse(
          req.body
        );

      const user =
        await updateProfileService(
          req.user!.id,
          validatedData
        );

      return res.json({
        success: true,
        message:
          "Profile updated",

        data: user
      });
    } catch (error) {
      next(error);
    }
  };

export const uploadProfilePicture =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.file) {
        throw new Error(
          "Image required"
        );
      }

      const user =
        await uploadProfilePictureService(
          req.user!.id,
          req.file.filename
        );

      return res.json({
        success: true,
        message:
          "Profile picture updated",

        data: user
      });
    } catch (error) {
      next(error);
    }
  };

export const forgotPassword =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result =
        await forgotPasswordService(
          req.body.email
        );

      return res.json({
        success: true,
        message:
          "Reset password token generated",

        data: result
      });
    } catch (error) {
      next(error);
    }
  };

export const resetPassword =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedData =
        resetPasswordSchema.parse(
          req.body
        );

      const result =
        await resetPasswordService(
          req.params.token as string,

          validatedData.password
        );

      return res.json({
        success: true,
        message:
          "Password reset success",

        data: result
      });
    } catch (error) {
      next(error);
    }
  };