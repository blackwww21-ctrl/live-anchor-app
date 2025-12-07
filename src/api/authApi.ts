import http from './http';

export const AuthApi = {
  loginByPhone: (phone: string, code: string) =>
    http.post('/auth/login', { phone, code }),
};
