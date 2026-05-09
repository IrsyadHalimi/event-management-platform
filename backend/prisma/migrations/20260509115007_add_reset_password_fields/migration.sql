-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordExpired" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT;
