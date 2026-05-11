import bcrypt from "bcryptjs";

import {
  createUser,
  findUserByEmail
} from "../repositories/auth.repository";

import {
  LoginPayload,
  RegisterPayload
} from "../interfaces/auth.interface";

import { generateToken } from "../utils/jwt";

export const registerService = async (
  payload: RegisterPayload
) => {
  const existingUser =
    await findUserByEmail(
      payload.email
    );

  if (existingUser) {
    throw new Error(
      "Email already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      payload.password,
      10
    );

  const user = await createUser({
    ...payload,
    password: hashedPassword
  });

  return user;
};

export const loginService = async (
  payload: LoginPayload
) => {
  const user =
    await findUserByEmail(
      payload.email
    );

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isValidPassword =
    await bcrypt.compare(
      payload.password,
      user.password
    );

  if (!isValidPassword) {
    throw new Error(
      "Invalid credentials"
    );
  }


  const token = generateToken({
    id: user.id,
    role: user.role // <--- Pastikan ini yang dikirim
  });

  return {
    token,
    user
  };
};