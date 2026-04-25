import api from '@/lib/api';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  AdminLoginCredentials,
  AdminRegisterData,
  AdminAuthResponse,
  User,
} from '@/types/user.types';
import { setToken, removeToken } from '@/lib/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    setToken(data.token);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', userData);
    setToken(data.token);
    return data;
  },

  async adminLogin(credentials: AdminLoginCredentials): Promise<AdminAuthResponse> {
    const { data } = await api.post<AdminAuthResponse>('/auth/admin/login', credentials);
    setToken(data.token);
    return data;
  },

  async adminRegister(userData: AdminRegisterData): Promise<AdminAuthResponse> {
    const { data } = await api.post<AdminAuthResponse>('/auth/admin/register', userData);
    setToken(data.token);
    return data;
  },

  async logout(): Promise<void> {
    removeToken();
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await api.post('/auth/reset-password', { token, password });
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },
};
