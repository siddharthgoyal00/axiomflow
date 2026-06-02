import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState } from "../types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, token: null, isAuthenticated: false,
      login: async (email:string, _password:string) => {
        const mockUser: User = {
          id:"u_01", email, plan:"free",
          name: email.split("@")[0].replace(/[._]/g," "),
          tokensUsed:12400, tokenQuota:50000,
          createdAt: new Date().toISOString(),
        };
        set({ user:mockUser, token:"mock_jwt_token", isAuthenticated:true });
      },
      register: async (name:string, email:string, _password:string) => {
        const mockUser: User = {
          id:"u_01", email, name, plan:"free",
          tokensUsed:0, tokenQuota:50000,
          createdAt: new Date().toISOString(),
        };
        set({ user:mockUser, token:"mock_jwt_token", isAuthenticated:true });
      },
      logout: () => set({ user:null, token:null, isAuthenticated:false }),
      setUser: (user:User) => set({ user }),
    }),
    { name:"axiomflow-auth" }
  )
);
