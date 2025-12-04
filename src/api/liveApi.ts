import http from './http';

export const LiveApi = {
  createRoom: (data: { title: string; coverUrl?: string; categoryId?: string }) =>
    http.post('/live/create', data),

  startRoom: (roomId: string) => http.post(`/live/${roomId}/start`),

  stopRoom: (roomId: string) => http.post(`/live/${roomId}/stop`),

  getUserSig: (userId: string) => http.post('/live/anchor/userSig', { userId }),

  getRoomSummary: (roomId: string) => http.get(`/live/${roomId}/summary`),

  muteViewer: (roomId: string, userId: string) =>
    http.post(`/live/${roomId}/mute`, { userId }),

  kickViewer: (roomId: string, userId: string) =>
    http.post(`/live/${roomId}/kick`, { userId }),
};