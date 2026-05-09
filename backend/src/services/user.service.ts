import bcrypt from "bcryptjs";

import { nanoid }
  from "nanoid";

import {
  updateUserRepo,
  findUserByEmailRepo,
  findUserByResetTokenRepo
} from "../repositories/user.repository";

export const updateProfileService =
  async (
    userId: string,
    payload: any
  ) => {
    return updateUserRepo(
      userId,
      payload
    );
  };

export const uploadProfilePictureService =
  async (
    userId: string,
    profilePicture: string
  ) => {
    return updateUserRepo(
      userId,
      {
        profilePicture
      }
    );
  };

export const forgotPasswordService =
  async (email: string) => {
    const user =
      await findUserByEmailRepo(
        email
      );

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    const token =
      nanoid(32);

    const expired =
      new Date(
        Date.now() +
          60 *
            60 *
            1000
      );

    return updateUserRepo(
      user.id,
      {
        resetPasswordToken:
          token,

        resetPasswordExpired:
          expired
      }
    );
  };

export const resetPasswordService =
  async (
    token: string,
    password: string
  ) => {
    const user =
      await findUserByResetTokenRepo(
        token
      );

    if (!user) {
      throw new Error(
        "Invalid reset token"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    return updateUserRepo(
      user.id,
      {
        password:
          hashedPassword,

        resetPasswordToken:
          null,

        resetPasswordExpired:
          null
      }
    );
  };