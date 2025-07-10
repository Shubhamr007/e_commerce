import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/apiService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    try { return jwtDecode(localStorage.getItem('token')); } catch { return null; }
  });
  const [lastLogin, setLastLogin] = useState(() => localStorage.getItem('lastLogin'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    const data = await api.login(email, password);
    if (data.token) {
      setToken(data.token);
      setUser(jwtDecode(data.token));
      const now = new Date().toISOString();
      setLastLogin(now);
      localStorage.setItem('lastLogin', now);
    } else {
      setError(data.error || 'Auth failed');
    }
    setLoading(false);
    return data;
  };

  const logout = () => {
    setToken('');
    setUser(null);
    setLastLogin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('lastLogin');
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError('');
    const data = await api.changePassword(currentPassword, newPassword, token);
    setLoading(false);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, token, lastLogin, loading, error, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// Ensure default export if needed (not strictly required for context, but for Vite import analysis)
// export default AuthProvider;
