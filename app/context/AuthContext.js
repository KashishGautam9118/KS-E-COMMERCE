// app/context/AuthContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        const user = JSON.parse(userData);
        setUser(user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      // Check if user already exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find(u => u.email === userData.email);

      if (userExists) {
        return { success: false, message: 'User already exists' };
      }

      // Create mock user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        createdAt: new Date().toISOString()
      };

      // Store user data locally
      existingUsers.push({ ...newUser, password: userData.password });
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'mock-token-' + newUser.id);

      setUser(newUser);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Registration failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);

      // Get users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = existingUsers.find(u => u.email === email && u.password === password);

      if (user) {
        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user;

        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', 'mock-token-' + user.id);

        setUser(userWithoutPassword);
        return { success: true };
      }

      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      return {
        success: false,
        message: 'Login failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      register,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};