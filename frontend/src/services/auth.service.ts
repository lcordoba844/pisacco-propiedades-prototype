import { api } from './api.service';
import type { LoginRequest, LoginResponse } from '../interfaces/auth.type';

export const authService = {
  login: async (credentials: LoginRequest): Promise<void> => {
    // 1. Tipamos estrictamente la petición y la respuesta
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    
    // 2. Extraemos 'jwt' con total confianza porque el backend lo garantiza
    const token = response.data.jwt;

    if (!token) {
      throw new Error("Error de contrato: El backend no devolvió el JWT esperado.");
    }
    
    localStorage.setItem('admin_token', token);
  },

  logout: () => {
    localStorage.removeItem('admin_token');
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('admin_token');
    return !!token && token !== 'undefined' && token !== 'null';
  }
};
