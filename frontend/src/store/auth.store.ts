import { create }
  from "zustand";

interface User {
  id: string;

  name: string;

  email: string;

  role:
    | "CUSTOMER"
    | "ORGANIZER";

  profilePicture?: string;
}

interface AuthState {
  token:
    string | null;

  user:
    User | null;

  setAuth: (
    token: string,
    user: User
  ) => void;

  setUser: (
    user: User
  ) => void;
  
  logout: () => void;
}

export const useAuthStore =
  create<AuthState>(
    (set) => ({
      token:
        localStorage.getItem(
          "token"
        ),

      user: null,

      setAuth: (
        token,
        user
      ) => {
        localStorage.setItem(
          "token",
          token
        );

        set({
          token,
          user
        });
      },

      setUser: (
          user
        ) =>
          set({
            user
          }),

      logout: () => {
        localStorage.removeItem(
          "token"
        );

        set({
          token: null,
          user: null
        });
      }
    })
  );