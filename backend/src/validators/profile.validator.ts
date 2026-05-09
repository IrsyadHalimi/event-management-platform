import { z } from "zod";

export const updateProfileSchema =
  z.object({
    name:
      z.string().min(3)
      .optional(),

    email:
      z.string().email()
      .optional()
  });

export const resetPasswordSchema =
  z.object({
    password:
      z.string().min(6)
  });