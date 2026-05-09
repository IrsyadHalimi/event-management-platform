import { Router } from "express";

import {
  updateProfile,
  uploadProfilePicture,
  forgotPassword,
  resetPassword
} from "../controllers/user.controller";

import {
  authMiddleware
} from "../middleware/auth.middleware";

import { upload }
  from "../config/multer";

const router = Router();

router.patch(
  "/profile",

  authMiddleware,

  updateProfile
);

router.patch(
  "/profile-picture",

  authMiddleware,

  upload.single(
    "profilePicture"
  ),

  uploadProfilePicture
);

router.post(
  "/forgot-password",

  forgotPassword
);

router.post(
  "/reset-password/:token",

  resetPassword
);

export default router;