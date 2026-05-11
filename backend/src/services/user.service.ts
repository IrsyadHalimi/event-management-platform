import bcrypt from "bcryptjs";

import { nanoid }
  from "nanoid";

import {
  updateUserRepo,
  findUserByEmailRepo,
  findUserByResetTokenRepo
} from "../repositories/user.repository";

import { sendEmail } from "../utils/mailer";

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
    const user = await findUserByEmailRepo(email);
    if (!user) throw new Error("User not found");

    const token = nanoid(32);
    const expired = new Date(Date.now() + 60 * 60 * 1000);

    await updateUserRepo(user.id, {
      resetPasswordToken: token,
      resetPasswordExpired: expired,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Panggil helper di sini
    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1>Reset Password Request</h1>
          <p>You requested to reset your password. Click the button below:</p>
          <a href="${resetLink}" style="background: black; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Reset Password Now
          </a>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    });

    return { message: "Reset link sent" };
  };

export const resetPasswordService = 
  async (token: string, password: string) => {
    const user = await findUserByResetTokenRepo(token);

    if (!user || !user.resetPasswordExpired || new Date() > user.resetPasswordExpired) {
      throw new Error("Token is invalid or has expired");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return updateUserRepo(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpired: null,
    });
  };