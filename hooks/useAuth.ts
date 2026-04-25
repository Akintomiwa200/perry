import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUser, logout, setLoading, setError } from '@/store/authSlice';
import { authService } from '@/services/authService';
import {
  LoginCredentials,
  RegisterData,
  AdminLoginCredentials,
  AdminRegisterData,
} from '@/types/user.types';

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((s: RootState) => s.auth);

  const login = async (credentials: LoginCredentials) => {
    dispatch(setLoading(true));
    try {
      const { user, token } = await authService.login(credentials);
      dispatch(setUser({ user, token }));
      return { success: true };
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Invalid email or password';
      dispatch(setError(msg));
      return { success: false, error: msg };
    }
  };

  const register = async (data: RegisterData) => {
    dispatch(setLoading(true));
    try {
      const { user, token } = await authService.register(data);
      dispatch(setUser({ user, token }));
      return { success: true };
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
      dispatch(setError(msg));
      return { success: false, error: msg };
    }
  };

  const adminLogin = async (credentials: AdminLoginCredentials) => {
    dispatch(setLoading(true));
    try {
      const { user, token } = await authService.adminLogin(credentials);
      dispatch(setUser({ user, token }));
      return { success: true };
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Invalid admin credentials';
      dispatch(setError(msg));
      return { success: false, error: msg };
    }
  };

  const adminRegister = async (data: AdminRegisterData) => {
    dispatch(setLoading(true));
    try {
      const { user, token } = await authService.adminRegister(data);
      dispatch(setUser({ user, token }));
      return { success: true };
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Admin registration failed. Please try again.';
      dispatch(setError(msg));
      return { success: false, error: msg };
    }
  };

  const signOut = async () => {
    await authService.logout();
    dispatch(logout());
  };

  return {
    user: auth.user,
    token: auth.token,
    isLoading: auth.isLoading,
    error: auth.error,
    isAuthenticated: !!auth.user,
    login,
    register,
    adminLogin,
    adminRegister,
    signOut,
  };
}
