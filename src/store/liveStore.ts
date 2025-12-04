import { create } from 'zustand';

export const useLiveStore = create(set => ({
  roomId: null,
  title: '',
  onlineCount: 0,
  likeCount: 0,
  setRoom: (roomId, title) => set({ roomId, title }),
  setOnlineCount: n => set({ onlineCount: n }),
  setLikeCount: n => set({ likeCount: n }),
}));
