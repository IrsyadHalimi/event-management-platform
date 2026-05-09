import prisma from "../config/prisma";

export const findUserByIdRepo =
  async (id: string) => {
    return prisma.user.findUnique({
      where: {
        id
      }
    });
  };

export const findUserByEmailRepo =
  async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email
      }
    });
  };

export const updateUserRepo =
  async (
    id: string,
    data: any
  ) => {
    return prisma.user.update({
      where: {
        id
      },

      data
    });
  };

export const findUserByResetTokenRepo =
  async (token: string) => {
    return prisma.user.findFirst({
      where: {
        resetPasswordToken:
          token,

        resetPasswordExpired: {
          gte: new Date()
        }
      }
    });
  };