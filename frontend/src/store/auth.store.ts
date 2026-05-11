import { create }
  from "zustand";

import { persist, createJSONStorage } from 'zustand/middleware';

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
  create<AuthState>()(
    persist(
    (set) => ({
      token: null, // Biarkan persist yang mengambil dari storage
      user: null,

      setAuth: (token, user) => {
        set({ token, user });
      },

      setUser: (user) => set({ user }),

      logout: () => {
        set({ token: null, user: null });
      }
    }),
    {
      name: 'auth-storage', // Nama key di localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
  );