import { api }
  from "../lib/axios";

export const updateProfileService =
  async (
    payload: FormData
  ) => {
    const response =
      await api.patch(
        "/users/profile",
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };

export const uploadProfilePictureService =
  async (
    payload: FormData
  ) => {
    const response =
      await api.patch(
        "/users/profile-picture",
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };

export const forgotPasswordService =
  async (
    email: string
  ) => {
    const response =
      await api.post(
        "/users/forgot-password",
        { email }
      );

    return response.data;
  };

export const resetPasswordService =
  async (
    token: string,
    password: string
  ) => {
    const response =
      await api.post(
        `/users/reset-password/${token}`,
        { password }
      );

    return response.data;
  };

export const changePasswordService =
  async (
    payload: {
      oldPassword: string;

      newPassword: string;
    }
  ) => {
    const response =
      await api.patch(
        "/users/change-password",
        payload
      );

    return response.data;
  };
  