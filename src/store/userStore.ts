import { create } from 'zustand';

type UserState = {
  userId: string | null;
  token: string | null;
  setUser: (params: { userId: string; token: string }) => void;
  clear: () => void;
};

export const useUserStore = create<UserState>(set => ({
  userId: null,
  token: null,
  setUser: ({ userId, token }) => set({ userId, token }),
  clear: () => set({ userId: null, token: null }),
}));
