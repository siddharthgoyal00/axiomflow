import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState } from "../types";
import api from "../api/axios.config";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const { data } = await api.post("/api/v1/auth/login", {
          email,
          password,
        });
        set({
          user: data.user,
          token: data.accessToken,
          isAuthenticated: true,
        });
      },

      register: async (name: string, email: string, password: string) => {
        const { data } = await api.post("/api/v1/auth/register", {
          name,
          email,
          password,
        });
        set({
          user: data.user,
          token: data.accessToken,
          isAuthenticated: true,
        });
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setUser: (user: User) => set({ user }),
    }),
    { name: "axiomflow-auth" },
  ),
);
