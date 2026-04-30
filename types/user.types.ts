export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  role: "user" | "admin" | "super_admin";
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AdminAuthResponse {
  user: User;
  token: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}
